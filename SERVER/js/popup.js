'use strict';
////////////////////////////////////////
// About button:
var aboutBtn = document.getElementById("about-btn");
var aboutInfo = document.getElementById("about-info");
aboutBtn.addEventListener("mouseover", function() {
    aboutInfo.style.display = "block";
});
aboutBtn.addEventListener("mouseout", function() {
    aboutInfo.style.display = "";
});
////////////////////////////
var adminInput = document.getElementById('access_code');
var loginShow = document.getElementById('admin-login-show');
loginShow.addEventListener('click', function() {
    adminInput.classList.toggle('show');
});
///////////////////////////
var input = document.getElementById('searchInput');

function client_search(input) {
    let filter, table, tr;
    filter = input.value.toUpperCase();
    table = document.getElementById('table-container');
    tr = table.getElementsByTagName('TR');
    let trArray = Array.from(tr);
    let trArraySliced = trArray.slice(0);

    for (let i = 0; i < trArraySliced.length; i++) {
        let textValue = trArraySliced[i].innerText || trArraySliced[i].textContent;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            trArraySliced[i].style.display = '';
        } else {
            trArraySliced[i].style.display = 'none';
        }
    }
}

input.focus();
input.addEventListener('keyup', function() {
    client_search(input);
});

var ajaxRequestPOPUP;

function get_clients() {
    ajaxRequestPOPUP = new XMLHttpRequest();

    ajaxRequestPOPUP.onreadystatechange = function() {
        if (ajaxRequestPOPUP.readyState == 4) {
            let results = JSON.parse(ajaxRequestPOPUP.responseText);
            console.log(results);
            let table = document.getElementById('client-list-tbody');
            for (let i = 0; i < results.length; i++) {
                let clientRow = document.createElement('TR');
                let clientDataName = document.createElement('TD');
                let clientAbbrSpan = document.createElement('SPAN');
                let clientID = results[i]['id'];
                let clientAbbr = document.createTextNode(" (" + results[i]['abbr'] + ")");
                clientAbbrSpan.appendChild(clientAbbr);
                let clientName = document.createTextNode(results[i]['name']);
                clientDataName.setAttribute('data-id', clientID);
                clientDataName.appendChild(clientName);
                clientDataName.appendChild(clientAbbrSpan);
                let clientDataLink = document.createElement('TD');
                let clientLinkAnchor = document.createElement('A');
                clientLinkAnchor.setAttribute('href', results[i]['link']);
                clientLinkAnchor.setAttribute('target', '_blank');
                clientLinkAnchor.innerHTML = 'View <svg width="12" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M440,256H424a8,8,0,0,0-8,8V464a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V112A16,16,0,0,1,48,96H248a8,8,0,0,0,8-8V72a8,8,0,0,0-8-8H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V264A8,8,0,0,0,440,256ZM500,0,364,.34a12,12,0,0,0-12,12v10a12,12,0,0,0,12,12L454,34l.7.71L131.51,357.86a12,12,0,0,0,0,17l5.66,5.66a12,12,0,0,0,17,0L477.29,57.34l.71.7-.34,90a12,12,0,0,0,12,12h10a12,12,0,0,0,12-12L512,12A12,12,0,0,0,500,0Z"></path></svg>';
                clientDataLink.appendChild(clientLinkAnchor);

                clientRow.appendChild(clientDataName);
                clientRow.appendChild(clientDataLink);
                table.insertAdjacentElement('beforeend', clientRow);
            }
        }
    }

    ajaxRequestPOPUP.open("GET", "https://www.example.com/SERVER/clickup-customizer.php?uncache=" + Math.floor(Math.random() * 999999999), true);
    ajaxRequestPOPUP.send(null);
}
get_clients();
