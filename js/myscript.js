let app = angular.module('EduCare',[]);
const resource_url = 'http://universities.hipolabs.com/search?country=india';
app.controller('MyCtrl',($scope,$http)=>{
    //This is controller
    console.log("App loaded");
    $http.get(resource_url).then(
        (response) =>{
            console.log('krunal')
            console.log(response.data[4]);
            $scope.all_university = response.data[4].name;
            $scope.all_country = response.data[4].country;
            $scope.all_state=response.data[4].state;
            if($scope.all_state!='')
            {
                $scope.all_add=$scope.all_university+', '+$scope.all_state+', '+$scope.all_country;
            }
            else{
            $scope.all_add=$scope.all_university+', '+$scope.all_country;
            }
            $scope.webpage=response.data[4].web_pages;
        },
        (error) => {
            console.log(error);
        }
        );
        // maps
        $scope.get_maps=()=>{
            console.log($scope.uni);
            let university=$scope.uni;
            const url='http://universities.hipolabs.com/search?name=';
            if(university=='')
            {
                mapboxgl.accessToken = 'pk.eyJ1IjoiaGdva2hydSIsImEiOiJjazE4c2ZrNmcwM3NpM2JxanpwbXloOXo5In0.RoQARhwqOcTryITI2KGwYw';
                // var place = angular.element(document.querySelector('[ng-controller="MyCtrl"]')).scope().all_data;
                // var place= document.getElementById('demo').innerHTML;
                console.log($scope.all_add)
                var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
                mapboxClient.geocoding
                .forwardGeocode({
                query: $scope.all_add,
                autocomplete: false,
                limit: 1
                })
                .send()
                .then(function (response) {
                if (
                response &&
                response.body &&
                response.body.features &&
                response.body.features.length
                ) {
                var feature = response.body.features[0];

                var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: feature.center,
                zoom: 12
                });
                var popup = new mapboxgl.Popup({ offset: 25 }).setText(
                    $scope.webpage
                    );
                new mapboxgl.Marker().setLngLat(feature.center).setPopup(popup).addTo(map);
                }
                });
            }
            else{
                $http.get(url+university).then(
                    (response) =>{
                        console.log(url+university)
                        console.log('dabhi')
                        console.log(response.data[0]);
                        $scope.req_university = response.data[0].name;
                        $scope.req_country = response.data[0].country;
                        $scope.req_add=$scope.req_university+', '+$scope.req_country;
                        $scope.req_state=response.data[0].state;
                        if($scope.req_state!='')
                        {
                            $scope.req_add=$scope.req_university+', '+$scope.req_state+', '+$scope.req_country;
                        }
                        else{
                        $scope.req_add=$scope.req_university+', '+$scope.req_country;
                        }
                        $scope.req_webpage=response.data[0].web_pages;
                        mapboxgl.accessToken = 'pk.eyJ1IjoiaGdva2hydSIsImEiOiJjazE4c2ZrNmcwM3NpM2JxanpwbXloOXo5In0.RoQARhwqOcTryITI2KGwYw';
                        // var place = angular.element(document.querySelector('[ng-controller="MyCtrl"]')).scope().all_data;
                        // var place= document.getElementById('demo').innerHTML;
                        console.log($scope.req_add)
                        var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
                        mapboxClient.geocoding
                        .forwardGeocode({
                        query: $scope.req_add,
                        autocomplete: false,
                        limit: 1
                        })
                        .send()
                        .then(function (response) {
                        if (
                        response &&
                        response.body &&
                        response.body.features &&
                        response.body.features.length
                        ) {
                        var feature = response.body.features[0];

                        var map = new mapboxgl.Map({
                        container: 'map',
                        style: 'mapbox://styles/mapbox/streets-v11',
                        center: feature.center,
                        zoom: 12
                        });
                        var popup = new mapboxgl.Popup({ offset: 25 }).setText(
                            $scope.req_webpage
                            );
                        new mapboxgl.Marker().setLngLat(feature.center).setPopup(popup).addTo(map);
                        }
                        });

                    },
                    (error) => {
                        console.log(error);
                    }
                    );
            }

        }
});