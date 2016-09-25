<?php

require_once 'config.php';

$nickname = $_POST['nickname'];
$name = $_POST['name'];
$surname = $_POST['surname'];
$email = $_POST['email'];
$password = $_POST['password'];

if (!preg_match("/^[A-Za-z0-9]+$/", $nickname) or 
    !preg_match("/^[A-Za-z]+$/i", $nickname[0])) {
    die("Никнэйм должен содержать только латинские буквы и цифры, начинаться должен с латинской буквы.");
}

if (!preg_match("#^[а-яё\s]+$#ius", strtolower($name))) {
    die("В имени допустимы только русские буквы.");
}

if (!preg_match("#^[а-яё\s]+$#ius", strtolower($surname))) {
    die("В фамилии допустимы только русские буквы.");
}

if (!preg_match('/@/i', $email)) {
    die("E-mail некорректен");
}

if (strlen($password) < 5) {
    die("Пароль должен быть не короче 5 символов");
}

$link = mysqli_connect($host, $user, $pswd) or die("Не могу соединиться с MySQL.");
mysqli_set_charset($link, 'utf8');

mysqli_select_db($link, $database) or die("Не могу подключиться к базе.");

$query = mysqli_prepare($link, "INSERT INTO $database.$table VALUES (?, ?, ?, ?, ?)");
mysqli_stmt_bind_param($query, 'sssss', $nickname, $name, $surname, $email, $password);

mysqli_stmt_execute($query);

if (mysqli_stmt_affected_rows($query) > 0) {
    echo "Регистрация завершена.";
} else {
    echo "При добавлении произошла ошибка";
}

mysqli_close($link);

?>