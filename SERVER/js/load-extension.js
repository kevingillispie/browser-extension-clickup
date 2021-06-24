'use strict';
var _formDataExtension = new FormData();
_formDataExtension.append(`action`, `load_popup`);
_formDataExtension.append(`request_type`, `POST`);
_formDataExtension.append(`header_type`, `json`);

var ajaxRequest;

function loadExention(ajaxRequest, _formDataExtension) {
    ajaxRequest = new XMLHttpRequest();

    ajaxRequest.onreadystatechange = function() {
        if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
            let bodyTag = document.getElementsByTagName('BODY');
            bodyTag[0].insertAdjacentHTML('beforeend', ajaxRequest.responseText);
            let popupJS = document.createElement('SCRIPT');
            popupJS.setAttribute('src', 'https://www.example.com/SERVER/js/popup.js?uncache=' + Math.floor(Math.random() * 999999999));
            popupJS.setAttribute('defer', 'true');
            popupJS.setAttribute('async', 'true');
            popupJS.setAttribute('type', 'text/javascript');
            let adminJS = document.createElement('SCRIPT');
            adminJS.setAttribute('src', 'https://www.example.com/SERVER/js/admin-login.js?uncache=' + Math.floor(Math.random() * 999999999))
            adminJS.setAttribute('defer', 'true');
            adminJS.setAttribute('async', 'true');
            adminJS.setAttribute('type', 'text/javascript');
            bodyTag[0].appendChild(popupJS);
            bodyTag[0].appendChild(adminJS);
        }
    }
    ajaxRequest.open('POST', 'https://www.example.com/SERVER/load-extension.php?uncache=' + Math.floor(Math.random() * 999999999), true);
    ajaxRequest.send(_formDataExtension);
};
loadExention(ajaxRequest, _formDataExtension);
