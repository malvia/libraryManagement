

var app = angular.module("libraryManagement", []);

app.controller("libraryManagementController", function($scope, $http) {

$scope.books = [];
$scope.form = {
    id : -1,
    author : null,
    categories : null,
    publisher : null,
    lastCheckedOut :null,
    lastCheckedOutBy :null,
    title : null,
    url: null
};

// load initial data at page load
refreshPageData();

// add or edit based on id
$scope.submitBook = function() {
    var method = "";
    var url = "";
    if ($scope.form.id == -1) {
        method = "POST";
        url = 'https://interview-api-staging.bytemark.co/books';
    } else {
        method = "PUT";
        url = 'https://interview-api-staging.bytemark.co/books/' + $scope.form.id;
    }

    $http({
        method : method,
        url : url,
        data : angular.toJson($scope.form),
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then( _success, _error );
};

$scope.removeBook = function(url) {
     var id = url.substring(url.lastIndexOf('/') + 1);
    $http({
        method : 'DELETE',
        url : 'https://interview-api-staging.bytemark.co/books/' + id
    }).then(_success, _error);
};

$scope.removeAllBook = function() {
    $http({
        method : 'DELETE',
        url : 'https://interview-api-staging.bytemark.co/clean'
    }).then(_success, _error);
};

$scope.editBook = function(book) {
    $scope.form.author = book.author;
    $scope.form.categories = book.categories;
    $scope.form.title = book.title;
    $scope.form.id = book.url.substring(book.url.lastIndexOf('/') + 1);
    $scope.form.publisher = book.publisher;
    $scope.form.url = book.url;
};

function refreshPageData() {
    $http({
        method : 'GET',
        url : 'https://interview-api-staging.bytemark.co/books'
    }).then(function successCallback(response) {
        $scope.books = response.data;
    }, function errorCallback(response) {
        console.log(response.statusText);
    });
}

function _success(response) {
    refreshPageData();
    clearForm()
}
// handling error
function _error(response) {
    console.log(response.statusText);
}

function clearForm() {
    $scope.form.author = "";
    $scope.form.categories = "";
    $scope.form.title = "";
    $scope.form.publisher = "";
    $scope.form.url = "";
    $scope.form.id = -1;
};
});
