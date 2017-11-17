<?php
    $username=$_GET['username'];
    $username_all=array("13534575206","506840830@qq.com","13333333333","14444444444","16666666666","666666@qq.com");
    if(in_array($username,$username_all)){
        echo "no";
    }
    else{
        echo "yes";
    }
 ?>