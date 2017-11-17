<?php
    $servername='localhost';
    $username='root';
    $password='';
    $database='duoshangwang';

    // 连接数据库
    $conn=new mysqli($servername,$username,$password,$database);
    // 检测是否连接
    if($conn->connect_errno){
        die('连接失败'.$conn->connect_error);
    }
    $conn->set_charset('utf8');
?>