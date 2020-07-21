"use strict";

var ajaxRequestCONTENT;
var results, taskbar, taskTags;

function get_client_link(taskTags, results) {
    for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < taskTags.length; j++) {
            let name = results.map(function(resObj) {
                return resObj.abbr;
            }).indexOf(taskTags[j].innerText);
            if (name > -1) {
                return results[name]['link'];
            }
        }
    }
}

function card_check() {
    let cardCheck = document.getElementsByClassName('client-card');
    for (let i = 0; i < cardCheck.length - 1; i++) {
        cardCheck[i].remove();
    }
}

function get_clients(taskbar, taskTags) {
    ajaxRequestCONTENT = new XMLHttpRequest();

    ajaxRequestCONTENT.onreadystatechange = function(results) {
        if (ajaxRequestCONTENT.readyState == 4) {
            results = JSON.parse(ajaxRequestCONTENT.responseText);
            let clientLink = document.createElement('A');
            let link = get_client_link(taskTags, results);
            clientLink.setAttribute('href', link);
            clientLink.setAttribute('class', 'client-card');
            clientLink.append("CLIENT CARD");
            taskbar.append(clientLink);
            card_check();
        }
    }

    ajaxRequestCONTENT.open("GET", "/clickup-customizer.php", true);
    ajaxRequestCONTENT.send(null);
}

function add_client_card(event) {
    let cardCheck = document.getElementsByClassName('client-card');
    card_check();
    if (cardCheck.length == 0) {
        var runChecker = setInterval(function() {
            taskbar = document.querySelector(".task__column.task__toolbar.task__toolbar_first");
            if (taskbar) {
                taskTags = document.querySelectorAll(".task-column__body-toolbar .cu-tags-select__name");
                if (taskTags.length > 0) {
                    get_clients(taskbar, taskTags, cardCheck);
                    clearTimeout(runChecker);
                }
            }
        }, 2000);
    }
}
window.addEventListener('click', add_client_card);
window.addEventListener('change', add_client_card);
window.addEventListener('DOMContentLoaded', add_client_card);