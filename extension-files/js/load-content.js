'use strict';

var contentJS = document.createElement('SCRIPT');
contentJS.setAttribute('src', 'https://www.example.com/js/content.js?uncache=' + Math.floor(Math.random() * 999999999));
contentJS.setAttribute('type', 'text/javascript');
contentJS.setAttribute('defer', 'true');
contentJS.setAttribute('async', 'true');
var contentCSS = document.createElement('LINK');
contentCSS.setAttribute('rel', 'stylesheet');
contentCSS.setAttribute('type', 'text/css');
contentCSS.setAttribute('href', 'https://www.example.com/css/content.css');
setTimeout(function() {
    document.getElementsByTagName('HEAD')[0].appendChild(contentCSS);
    document.getElementsByTagName('BODY')[0].appendChild(contentJS);
}, 1000);
