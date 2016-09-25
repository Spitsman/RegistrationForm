<?php

require_once 'config.php';

$value = $_POST['value'];
$field = $_POST['field'];
    
$link = mysqli_connect($host, $user, $pswd) or die("Не могу соединиться с MySQL.");
mysqli_set_charset($link, 'utf8');

mysqli_select_db($link, $database) or die("Не могу подключиться к базе!");

$query = "SELECT $field FROM $database.$table WHERE $field='$value'";

if ($result = mysqli_query($link, $query)) { 
    
    $count=mysqli_num_rows($result);

    $HTML = false;
    if ($count > 0) {
        $HTML = false;
    } else {
        $HTML = true;
    }

    echo $HTML;
    mysqli_free_result($result); 
} 
mysqli_close($link);

?>

