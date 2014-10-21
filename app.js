var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/projects');
    
    $stateProvider
        /*.state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })*/

        .state('projects', {
            url: '/projects',
            templateUrl: 'projects.html',
            controller: 'projectsController'
        })

        .state('project', {
            url: '/:projectName',
            templateUrl: 'project.html', 
            controller: 'projectController'
        })

        $locationProvider.html5Mode(true);
});

app.controller('projectsController', function($scope, projectObject) {
    projectObject.getData(function(data){
        $scope.projects = data.projects;
    });
});

app.controller('projectController', function($scope, $stateParams, projectObject) {

    projectObject.getData(function(data){
        $scope.project = _.find(data.projects, function(project){
            return project.name === $stateParams.projectName;
        });  
    });
});

app.factory('projectObject', function($http){
    var projects;

    return {getData: function(callback){
        if(!projects){
            $http.get('projects/projects.json').success(function(data){
                projects = data;
                callback(projects);
            });
        }
        else{
            callback(projects);
        }
    }};
});