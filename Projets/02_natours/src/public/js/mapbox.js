/* eslint-disable */

const displayMap = locations => {

    mapboxgl.accessToken = 'pk.eyJ1IjoibW9oYW1lbWwiLCJhIjoiY203YXdqN2ZqMDM3bTJxc2Z0YXR3NGMweiJ9.Bmgd-CMnjFOyRv329ygVhg';


    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mohameml/cm7axlh6b005b01r7233zfwns',
        scrollZoom: false
        // center: [-118.113491, 34.111745],
        // zoom: 10,
        // interactive: false
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {

        // Create marker
        const el = document.createElement('div');
        el.className = 'marker';

        // Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        })
            .setLngLat(loc.coordinates)
            .addTo(map);


        // Add popup
        new mapboxgl.Popup({
            offset: 30
        })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map);

        // Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};


const locations = JSON.parse(document.getElementById('map').dataset.locations);

displayMap(locations);


console.log(locations);

