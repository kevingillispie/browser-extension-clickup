<?php

header('Access-Control-Allow-Origin: *');

/////////////////////////////////////////////////
// OPTIONAL:
if ($_SERVER['REMOTE_ADDR'] != '[[your IP address]]') {
    echo "Your IP address is verbotten.";
    die();
}
/////////////////////////////////////////////////

if ($_POST['access_code'] == '[[access code]]') {
    ?>
    <div id="client-info">
        <input type="text" name="name" id="name" placeholder="Client Name">
        <input type="text" name="abbr" id="abbr" placeholder="Client Abbreviation">
        <input type="text" name="link" id="link" placeholder="Link to Client Card">
    </div>
    <p id="clear-fields">Clear Fields</p>
    <div>
        <div id="add-client-btn">Add Client</div>
        <div id="remove-client-btn">Remove Client</div>
    </div>
    <?php
} else {
    echo "";
}
die();
