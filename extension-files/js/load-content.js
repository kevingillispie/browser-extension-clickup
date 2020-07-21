'use strict';

var contentJS = document.createElement('SCRIPT');
contentJS.setAttribute('src', '/js/content.js');
var contentCSS = document.createElement('LINK');
contentCSS.setAttribute('rel', 'stylesheet');
contentCSS.setAttribute('href', '/css/content.css')
setTimeout(function() {
    document.getElementsByTagName('HEAD')[0].appendChild(contentCSS);
    document.getElementsByTagName('BODY')[0].appendChild(contentJS);
}, 1000);
