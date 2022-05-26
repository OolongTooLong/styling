var iconBase = './uploads/map-icon.png';



if ($('.map').length) {
    function initmultipleMaps() {

        $('.map').each(function (index, Element) {

            var params = $(Element).text().split(",");
            const target = {
                lat: parseFloat(params[0]),
                lng: parseFloat(params[1])
            };
            const zoom = parseFloat(params[2]);
            const mapID = params[3];
            const iconColour = params[4];
            const addressName = params[5] + params[6] + params[7] + params[8];
            const mapStringLit = `${mapID}`;

            var myOptions = {
                zoom: zoom,
                mapId: mapStringLit,
                center: target,
                disableDefaultUI: true,
            };
            var map = new google.maps.Map(Element, myOptions);
            var icon = {
                path: "M23.13,8a11.45,11.45,0,0,0-10.5-8c-5.15-.23-9,2.07-11.39,6.65A12.67,12.67,0,0,0,3,20.31c2.67,3,5.47,6,8.21,8.94L12,30l.77-.78q3.84-4.21,7.69-8.42A12.26,12.26,0,0,0,23.13,8ZM11.86,17.79a5.66,5.66,0,0,1-5.3-5.61,5.52,5.52,0,0,1,5.64-5.6,5.62,5.62,0,0,1-.34,11.21Z",
                fillColor: iconColour,
                fillOpacity: 1,
                anchor: new google.maps.Point(12, 24),
                strokeWeight: 0,
                scale: 1.5
            }
            const marker = new google.maps.Marker({
                position: target,
                map: map,
                icon: icon
            });
            const infowindow = new google.maps.InfoWindow({
                content: addressName + ' <a target="_blank" href="http://maps.google.com/?q=' + addressName + '">Get Directions</a>',
            });
            marker.addListener("click", () => {
                infowindow.open(map, marker);
            })

        });

    }
}
if ($('#map').length) {
    function initmultiplePins() {
        var parentMapInfo = $("#map > .map-info");
        var mapParams = parentMapInfo.text().split(",");
        const zoom = parseFloat(mapParams[0]);
        const mapID = mapParams[1];
        const mapStringLit = `${mapID}`;

        var maps = $("#map > .location");
        var location = [];

        maps.each(function (index, Element) {
            var params = $(Element).text().split(",");
            location.push({
                    lat: parseFloat(params[0]),
                    lng: parseFloat(params[1]),
                    addressName: params[3] + params[4] + params[5],
                    iconColour: params[2]
                }
            );
        });

        //First location defines the Map Center
        var center = new google.maps.LatLng(location[0].lat, location[0].lng);
        var myOptions = {
            zoom: zoom,
            mapId: mapStringLit,
            center: center,
            disableDefaultUI: true,
        };

        var map = new google.maps.Map(document.getElementById('map'), myOptions);

        var infowindow = new google.maps.InfoWindow({});
        var marker, count;

        for (count = 0; count < location.length; count++) {
            var icon = {
                path: "M23.13,8a11.45,11.45,0,0,0-10.5-8c-5.15-.23-9,2.07-11.39,6.65A12.67,12.67,0,0,0,3,20.31c2.67,3,5.47,6,8.21,8.94L12,30l.77-.78q3.84-4.21,7.69-8.42A12.26,12.26,0,0,0,23.13,8ZM11.86,17.79a5.66,5.66,0,0,1-5.3-5.61,5.52,5.52,0,0,1,5.64-5.6,5.62,5.62,0,0,1-.34,11.21Z",
                fillColor: location[count].iconColour,
                fillOpacity: 1,
                anchor: new google.maps.Point(12, 24),
                strokeWeight: 0,
                scale: 1.5
            }
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(location[count].lat, location[count].lng),
                map: map,
                icon: icon
            });
            google.maps.event.addListener(marker, 'click', (function (marker, count) {
                return function () {
                    infowindow.setContent(location[count].addressName + ' <a target="_blank" href="http://maps.google.com/?q=' + location[count].addressName + '">Get Directions</a>');

                    // infowindow.setContent(location[count].name);
                    infowindow.open(map, marker);
                }
            })(marker, count));
        }
    }
}

