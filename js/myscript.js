let app = angular.module('BrightCare',[]);
var api_key = ''; // Get your API key at developer.betterdoctor.com
var doctor_uid = '333d4bb6fcf640e18e93b11b00fe09eb'
const resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?user_key=0eabe6a61f0995b2b4c5fc93992b158e' + api_key;
app.controller('MyCtrl',($scope)=>{
    //This is controller
    $scope.title="Stay home Stay safe";
    console.log("App loaded");
    $http.get(resource_url).then(
        (response) =>{
            console.log(response.data);
            $scope.all_data = response.data;
        },
        (error) => {
            console.log(error);
        }
        )  ;
    
});
