'use strict';
var _formDataLoad = new FormData();
_formDataLoad.append(`request_type`, `POST`);
_formDataLoad.append(`header_type`, `json`);

var adminLogin = document.getElementById("access_code");
adminLogin.addEventListener("keyup", function(event) {
    if (event.code === 13) {
        event.preventDefault();
        loadAddRemoveButtons(_formDataLoad);
    }
});

//////////////////////////////////////////////////////
/////////////////////////////////////////////////////

function addRemoveListenerToClients() {
    let clientList = document.getElementById('client-list-tbody');
    console.log(clientList);
    for (let i = 0; i < clientList.children.length; i++) {
        clientList.children[i].firstChild.addEventListener('click', function(event) {
            selectClientToRemove(event);
        });
    }
}

function selectClientToRemove(event) {
    let abbr = event.target.lastChild.textContent;
    abbr = abbr.trim();
    abbr = abbr.replace("(", "");
    abbr = abbr.replace(")", "");
    document.getElementById("name").value = event.target.firstChild.textContent;
    document.getElementById("abbr").value = abbr;
    document.getElementById("link").value = "Client ID: " + event.target.attributes["data-id"].value;
}

function removeClient() {
    let id = document.getElementById("link").value;
    id = id.replace("Client ID: ", "");
    let removeRequest = new XMLHttpRequest();
    let _formDataRemove = new FormData();
    _formDataRemove.append(`request_type`, `POST`);
    _formDataRemove.append(`header_type`, `json`);
    _formDataRemove.append('id', id);
    removeRequest.onreadystatechange = function() {
        if (removeRequest.readyState == 4 && removeRequest.status == 200) {
            alert(removeRequest.responseText);
        }
    }
    removeRequest.open('POST', 'https://www.example.com/remove-clients.php?uncache=' + Math.floor(Math.random() * 999999999), true);
    removeRequest.send(_formDataRemove);
}

function addNewClient() {
    let clientName = document.getElementById("name").value;
    let clientAbbr = document.getElementById("abbr").value;
    let clientLink = document.getElementById("link").value;
    if (!clientName || !clientAbbr || !clientLink) {
        alert("Please complete all fields.");
        return;
    } else {
        let addClientRequest = new XMLHttpRequest();
        let _formDataAdd = new FormData();
        _formDataAdd.append("name", clientName);
        _formDataAdd.append("abbr", clientAbbr);
        _formDataAdd.append("link", clientLink);
        _formDataAdd.append(`request_type`, `POST`);
        _formDataAdd.append(`header_type`, `json`);
        addClientRequest.onreadystatechange = function() {
            if (addClientRequest.readyState == 4 && addClientRequest.status == 200) {
                alert(addClientRequest.responseText + "\nHello");
            }
        }
        addClientRequest.open('POST', 'https://www.example.com/add-clients.php?uncache=' + Math.floor(Math.random() * 999999999), true);
        addClientRequest.send(_formDataAdd);
    }
}

function addClientListener() {
    do {
        document.getElementById("add-client-btn").addEventListener('click', function() {
            addNewClient();
        });
        document.getElementById("remove-client-btn").addEventListener('click', function() {
            removeClient();
        });
        let clearFields = document.getElementById("clear-fields");
        clearFields.addEventListener('click', function() {
            document.getElementById("name").value = '';
            document.getElementById("abbr").value = '';
            document.getElementById("link").value = '';
        });
        addRemoveListenerToClients();
    } while (!document.getElementById("add-client-btn"));
}

function loadAddRemoveButtons(_formDataLoad) {
    let ajaxRequest = new XMLHttpRequest();
    ajaxRequest.onreadystatechange = function() {
        if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
            if (ajaxRequest.responseText == "") {
                alert("（ ´,_ゝ`)☞ You didn't say the magic word.");
            } else {
                let addClientContainer = document.getElementById('add-remove-clients-container');
                addClientContainer.innerHTML = '';
                addClientContainer.insertAdjacentHTML('afterbegin', ajaxRequest.responseText);
                addClientListener();
            }
        }
    }
    _formDataLoad.append('access_code', document.getElementById('access_code').value);
    ajaxRequest.open('POST', 'https://www.example.com/admin-login.php?uncache=' + Math.floor(Math.random() * 999999999), true);
    ajaxRequest.send(_formDataLoad);
};
