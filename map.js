var geocoder;
var map;
var marker;
var customMarker = new google.maps.MarkerImage('pin.png');

function getNavGeoLocation(){
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(

            function (position) {
                initialize(position.coords.latitude,position.coords.longitude);
            },

            function (error) {
                switch(error.code)
                {
                    case error.TIMEOUT:
                        alert ('Timeout');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert ('Position unavailable');
                        break;
                    case error.PERMISSION_DENIED:
                        alert ('Permission denied');
                        break;
                    case error.UNKNOWN_ERROR:
                        alert ('Unknown error');
                        break;
                }
            }
            );
    }
}


function initialize(latitude, longitude){
    var latlng = new google.maps.LatLng(latitude,longitude);
    var options = {
        zoom: 17,
        center: latlng,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), options);
    geocoder = new google.maps.Geocoder();
    marker = new google.maps.Marker({
        map: map,
        icon: customMarker,
        draggable: true
    });
    marker.setPosition(latlng);

    geocoder.geocode({
        'latLng': marker.getPosition()
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                document.getElementById("address").value = results[0].formatted_address;
                document.getElementById("latitude").value = marker.getPosition().lat();
                document.getElementById("longitude").value = marker.getPosition().lng();
            }
        }
    });

    //Add listener to marker for reverse geocoding
    google.maps.event.addListener(marker, 'dragend', function() {
        geocoder.geocode({
            'latLng': marker.getPosition()
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    document.getElementById("address").value = results[0].formatted_address;
                    document.getElementById("latitude").value = marker.getPosition().lat();
                    document.getElementById("longitude").value = marker.getPosition().lng();
                    var point = marker.getPosition();
                    map.panTo(point);

                }
            }
        });
    });

} //:~



