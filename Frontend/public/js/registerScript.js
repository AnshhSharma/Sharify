app=angular.module('myapp',[]);
app.controller('myctrl',function($scope){
    $scope.clear=function(){
        $scope.fname=null;
        $scope.lname=null;
        $scope.email=null;
        $scope.pwd=null;
        $scope.phone=null;
    };
});
