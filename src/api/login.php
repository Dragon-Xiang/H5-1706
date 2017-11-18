<?php
    include 'connect.php';
    $username=isset($_GET['username']) ? $_GET['username'] : '';
    $password=isset($_GET['password']) ? $_GET['password'] : '';
    if($username!=''&&$password==''){
        $sql = "select username from user where username='$username'";
        $result = $conn->query($sql);
        if($result->num_rows>0){
            $result->free();
            echo "fail";
            
        }
    }else if($username!=''&&$password!=''){
        // $result->free();
        $sql = "insert into user(username,password) values('$username','$password')";
        $result = $conn->query($sql);
        if ($result) {
            // 写入成功
            echo "ok";
        } else {
            // 写入失败
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    $conn->close();
?>