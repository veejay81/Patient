﻿// <reference path="../angular.js" />  
/// <reference path="../angular.min.js" />   
/// <reference path="../angular-animate.js" />   
/// <reference path="../angular-animate.min.js" />   


var app;


(function () {
    app = angular.module("RESTClientModule", ['ngAnimate']);
})();


app.controller("AngularJs_studentsController", function ($scope, $timeout, $rootScope, $window, $http) {
    $scope.date = new Date();
    $scope.MyName = "shanu";
    $scope.stdName = "";
    $scope.stdemail = "";

    $scope.showStudentAdd = true;
    $scope.addEditStudents = false;
    $scope.StudentsList=true;
    $scope.showItem = true;

    //This variable will be used for Insert/Edit/Delete Students details.
    $scope.StdIDs = 0;
    $scope.stdNames = "";
    $scope.stdEmails = "";
    $scope.Phones = "";
    $scope.Addresss = "";
    
    selectStudentDetails($scope.stdName, $scope.stdemail);  

    function selectStudentDetails(Name, Medicare) {
       

        $http.get('/api/patients/', { params: { Name: Name, Medicare: Medicare } }).success(function (data) {
            $scope.Students = data;

            $scope.showStudentAdd = true;
            $scope.addEditStudents = false;
            $scope.StudentsList = true;
            $scope.showItem = true;
         
        
            if ($scope.Students.length > 0) {
             
            }
        })
   .error(function () {
       $scope.error = "An Error has occured while loading posts!";
   });
    }


    //Search
    $scope.searchStudentDetails = function () {
      
        selectStudentDetails($scope.stdName, $scope.stdemail);
    }

    //Edit Student Details
    $scope.studentEdit = function studentEdit(StudentID, Name, Email, Phone, Address) {
        cleardetails();
        $scope.StdIDs = StudentID;
        $scope.stdNames = Name
        $scope.stdEmails = Email;
        $scope.Phones = Phone;
        $scope.Addresss = Address;
      
        $scope.showStudentAdd = true;
        $scope.addEditStudents = true;
        $scope.StudentsList = true;
        $scope.showItem = true;
    }

    //Delete Dtudent Detail
    $scope.studentDelete = function studentDelete(StudentID, Name) {
        cleardetails();
        $scope.StdIDs = StudentID;
        var delConfirm = confirm("Are you sure you want to delete " + Name + " ?");
        if (delConfirm == true) {

            $http.get('/api/patients/delete/', { params: { ID: $scope.StdIDs } }).success(function (data) {
                cleardetails();
                selectStudentDetails('', '');
            })
      .error(function () {
          $scope.error = "An Error has occured while loading posts!";
      });
          
        }     
      }

    // New Student Add Details
    $scope.showStudentDetails = function () {
        cleardetails();     
        $scope.showStudentAdd = true;
        $scope.addEditStudents = true;
        $scope.StudentsList = true;
        $scope.showItem = true;

        
    }

    //clear all the control values after insert and edit.
    function cleardetails()
    {
        $scope.StdIDs = 0;
        $scope.stdNames = "";
        $scope.stdEmails = "";
        $scope.Phones = "";
        $scope.Addresss = "";
    }

    //Form Validation
    $scope.Message = "";
    $scope.IsFormSubmitted = false;

    $scope.IsFormValid = false;


    $scope.$watch("f1.$valid", function (isValid) {
        $scope.IsFormValid = isValid;
       
    });

    //Save patients
    $scope.saveDetails = function () {

        $scope.IsFormSubmitted = true;
        if ($scope.IsFormValid) {
            debugger;
            //if the Student ID=0 means its new Student insert here i will call the Web api insert method
            if ($scope.StdIDs == "Nil") {
                $http.get('/api/patients/insertStudent/', { params: { StudentName: $scope.stdNames, StudentEmail: $scope.stdEmails, Phone: $scope.Phones, Address: $scope.Addresss } }).success(function (data) {
              //  $http.get('/api/patients/insert/',        { params: {Name: $scope.stdNames, Medicare: $scope.stdEmails, Phone: $scope.Phones, Address: $scope.Addresss } }).success(function (data) {

                    $scope.StudentsInserted = data;
                    cleardetails();
                    selectStudentDetails('', '');

                })
         .error(function () {
             $scope.error = "An Error has occured while loading posts!";
         });
            }
            else {  // to update to the details

                    $http.get('/api/patients/update/', { params: { ID: $scope.StdIDs, Name: $scope.stdNames, Medicare: $scope.stdEmails, Phone: $scope.Phones, Address: $scope.Addresss } }).success(function (data) {
                        if ($scope.StdIDs == 0) {
                            $scope.StudentsInserted = data;
                        }else
                        { $scope.StudentsUpdated = data;}
                    cleardetails();
                    selectStudentDetails('', '');

                })
        .error(function () {
            $scope.error = "An Error has occured while loading posts!";
        });
            }
           
        }
        else {
            $scope.Message = "All the fields are required.";
        }

       
    }

});