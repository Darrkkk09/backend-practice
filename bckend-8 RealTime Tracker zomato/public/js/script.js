const socket = io();

// try {
//     if (navigator.geolocation) {
//         navigator.geolocation.watchPosition(
//             (pos) => {
//                 const { latitude, longitude } = pos.coords;
//                 socket.emit("user-location", { latitude, longitude });
//             },
//             (err) => {
//                 console.error(err);
//             },
//             {
//                 enableHighAccuracy: true,
//                 maximumAge: 0,
//                 timeout: 5000
//             }
//         );
//     }
// } catch (e) {
//     console.error(e);
// }
// const map = L.map("map").setView([0,0],15)
// let marker = [];
// socket.on("update-location",(data)=>{
//     const {id,latitude,longitude} = data;
//     if(marker[id])
//     {
//         marker[id].setLatLng({latitude,longitude})
//     }
//     else{
//         marker[id] = L.marker([latitude,longitude],15).addto(map);
//     }
//     if(id == socket.id)
//     {
//         L.map(map).setView([latitude,longitude],15)
//     }
        
    
// })
// socket.on("disconnect",(id)=>{
//     map.removeLayer(marker[id]);
//     delete marker[id];
// })







//////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////





let map;
let markers = {};
let initialized = false;

try {
    if (navigator.geolocation) {
        console.log("Geolocation is supported by this browser.");
        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                socket.emit("user-location", { latitude, longitude });

                // Initialize map only once using your location
                if (!initialized) {
                    map = L.map("map").setView([latitude, longitude], 13);
                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
                    initialized = true;
                }
            },
            (error) => {
                console.error(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }
} catch (error) {
    console.error(error);
}

// Listen for other users' location updates
socket.on("update-location", (data) => {
    const { id, data: { latitude, longitude } } = data;

    if (!map) return; // skip if map isn't ready yet

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }

    if (id === socket.id) {
        map.setView([latitude, longitude], 14.5);
    }
});

socket.on("user-disconnected", ({ id }) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});
