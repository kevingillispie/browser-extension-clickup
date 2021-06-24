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

function duplicate_card_check() {
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
            if (link == undefined) {console.log("NO LINK"); return;}
            clientLink.setAttribute('href', link);
            clientLink.setAttribute('class', 'client-card');
            clientLink.append("CLIENT CARD");
            taskbar.append(clientLink);
            duplicate_card_check();
        }
    }

    ajaxRequestCONTENT.open("GET", "https://www.example.com/clickup-customizer.php?uncache=" + Math.floor(Math.random() * 999999999), true);
    ajaxRequestCONTENT.send(null);
}

function add_client_card(event) {
    let cardCheck = document.getElementsByClassName('client-card');
    duplicate_card_check();
    if (cardCheck.length == 0) {
        var runChecker = setInterval(function() {
            taskbar = document.querySelector(".task__column.task__toolbar.task__toolbar_first");
            if (taskbar) {
                taskTags = document.querySelectorAll(".cu-tags-view__container .cu-tags-select__name");
                console.log(taskTags[0].innerText);
                if (taskTags.length > 0) {
                    get_clients(taskbar, taskTags);
                    clearTimeout(runChecker);
                }
            }
        }, 2000);
    }
}


////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
var fieldValuesArray = [];
function characterToCode(char) {
    return char.charCodeAt(0);
}
var fieldFunctions = {
    status: function() {
        setTimeout(() => {
            document.querySelector(".cu-custom-fields__form-input.cu-custom-fields__form-input_placeholder.cu-custom-fields__form-input_pointer.ng-tns-c59-54.ng-star-inserted").addEventListener("click", function(event) {console.log(event)});
            document.querySelector(".cu-custom-fields__form-input.cu-custom-fields__form-input_placeholder.cu-custom-fields__form-input_pointer.ng-tns-c59-54.ng-star-inserted").click();
            setTimeout(() => {
                document.getElementsByClassName('cdk-overlay-container')[0].firstChild.addEventListener('click', function(event) {console.log(event)});
                document.getElementsByClassName('cdk-overlay-container')[0].children[0].click();
            }, 1000)
        }, 1000)
    }
}

function openFields() {
    let customFields = document.querySelector(".cu-custom-fields__header.cu-custom-fields__header_task-view");
    customFields.click();
}

function copyFieldValues() {
    var fieldValues = document.querySelectorAll(".cu-custom-fields__header-items-name");
    for (let i = 0; i < fieldValues.length; i++) {
        fieldValuesArray[i] = fieldValues[i].children[1].textContent;
    }
}

function pasteFieldValues() {
    fieldFunctions.status();
}

function copyFieldButtonDuplicateCheck() {
    let copyButton = document.getElementsByClassName("custom-field-btn");
    for (let i = 0; i < copyButton.length - 1; i++) {
        copyButton[i].remove();
    }
}

function addCopyFieldsButton() {
    let customFields = document.querySelector(".cu-custom-fields__header.cu-custom-fields__header_task-view");
    var openCustomFields = document.createElement("DIV");
    openCustomFields.classList.add("custom-field-btn");
    openCustomFields.innerText = "COPY CUSTOM FIELDS";
    openCustomFields.addEventListener('click', function() {
        copyFieldValues();
        openFields();
        pasteFieldValues();
    });
    customFields.insertAdjacentElement('beforebegin', openCustomFields);
    copyFieldButtonDuplicateCheck();
}

////////////////////////////
// ASSIGN DEM LISTENERS! //
//////////////////////////
var path = window.location.pathname;
if (path.indexOf("/t/") > -1) {
    var eventTypes = ["click", "change", "load"];
    eventTypes.forEach(element => {
        window.addEventListener(element, add_client_card);
        window.addEventListener(element, function() {
            addCopyFieldsButton();
        });
    });
}
