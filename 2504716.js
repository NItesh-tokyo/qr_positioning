const reader = new Html5Qrcode("camera");
let scannerOn = false;

function toggleScanner() {
    scannerOn = !scannerOn;
    if (scannerOn) {
        startScanner();
        mapContainer.style.display = "none";
        inventory.style.display = "none"; //hide inventory while scanning
        btn.innerText = "CANCEL";
    } else {
        stopScanner();
        mapContainer.style.display = "block";
        btn.innerText = "SCAN";
    }
}

function startScanner() {
    reader.start(
        { facingMode: "environment" },
        {},
        function (text) {
            const place = JSON.parse(text);
            showMarkerAt(place.top, place.left);
            showMarkerAt(place); .// NEw display inventory info
            toggleScanner();
        }
    ).catch(function (err) {
        console.error(err);
    });
}

function stopScanner() {
    reader.stop();
}

function showMarkerAt(top, left) {
    marker.style.top = top;
    marker.style.left = left;
}

// NEW: function to display inventory information
function showInventory(item) {
    document.getElementById("itemName").textContent = "Name:" = item.name;
    document.getElementById("itemStock").textContent = "In Stock:" +
    (item.inStock ? "yes" : "No");
    document.getElementById("itemPrice").textCOntent = "price: €" + item.price;
    document.getElementById("inventory").style.display = "block";
}
