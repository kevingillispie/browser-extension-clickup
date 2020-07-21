<?php

header('Access-Control-Allow-Origin: *');

////////////////////////////////////////////////////////
// OPTIONAL:
if ($_SERVER['REMOTE_ADDR'] != '[[your IP address]]') {die();}
////////////////////////////////////////////////////////

$dbhost = "127.0.0.1";
$dbuser = "[[database username]]";
$dbpass = "[[database password]]";
$dbname = "[[database name]]";

$link = mysqli_connect( $dbhost, $dbuser, $dbpass, $dbname );

if ( !$link ) 
{
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$sql_query = 'SELECT * FROM `clickup_customizer`;';

$qry_result = $link->query($sql_query);

$rows = array();

if ( $qry_result->num_rows > 0 )
{
    while ( $r = mysqli_fetch_assoc( $qry_result ) ) 
    {
        $rows[] = $r;
    }
} 
else 
{
    $rows[] = 0;
}

print json_encode($rows);

mysqli_close($link);