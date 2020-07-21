<?php

header('Access-Control-Allow-Origin: *');

/////////////////////////////////////////////////
// OPTIONAL:
if ($_SERVER['REMOTE_ADDR'] != '[[your IP address]]') {
    echo "Your IP address is verbotten.";
    die();
}
/////////////////////////////////////////////////

$id = $_POST['id'];

$dbhost = "127.0.0.1";
$dbuser = "[[database username]]";
$dbpass = "[[database password]]";
$dbname = "[[database name]]";

$dbLink = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

if (!$dbLink) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$add_client_query = "
    DELETE FROM
        `clickup_customizer`
    WHERE
        `id` = $id";

if ($dbLink->query($add_client_query))
{
    echo "Client deleted successfully.";
} else {
    echo "Error: " . $$add_client_query . "<br>" . $dbLink->error;
}

mysqli_close($dbLink);
