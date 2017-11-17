<?php
     include 'connect.php';
     $paramsId=isset($_GET['paramsId'])?$_GET['paramsId']:'';
     $sql="select * from goods";
     if($paramsId){
        $sql .=" where id='$paramsId'";
     }
     $result=$conn->query($sql);
     $row=$result->fetch_all(MYSQLI_ASSOC);
     $result->free();
    // 关闭连接
    $conn->close();
     echo json_encode($row,JSON_UNESCAPED_UNICODE);
    

?>