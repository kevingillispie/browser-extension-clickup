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
            popupJS.setAttribute('src', '/popup.js');
            popupJS.setAttribute('defer', '');
            let adminJS = document.createElement('SCRIPT');
            adminJS.setAttribute('src', '/admin-login.js')
            adminJS.setAttribute('defer', '');
            bodyTag[0].appendChild(popupJS);
            bodyTag[0].appendChild(adminJS);
        }
    }
    ajaxRequest.open('POST', '/load-extension.php', true);
    ajaxRequest.send(_formDataExtension);
};
loadExention(ajaxRequest, _formDataExtension);