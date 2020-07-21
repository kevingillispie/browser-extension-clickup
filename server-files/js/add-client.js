// DO NOT USE

var addButton = document.getElementById('add-client-btn');
addButton.addEventListener('click', function() {
    alert("nailed it");
})

var addClientRequest;

function addClient() {
    addClientRequest = new XMLHttpRequest();
    addClientRequest.onreadystatechange = function() {
        if (addClientRequest.readyState == 4) {
            let response = JSON.parse(addClientRequest.responseText);

        }
    }
}
