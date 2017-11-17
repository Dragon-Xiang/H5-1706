<?php
    include 'connect.php';
    
    $pageNo=isset($_GET['pageNo']) ? $_GET['pageNo'] : 1;
    $num=isset($_GET['num']) ? $_GET['num']: 12;
    $cate=isset($_GET['category']) ? $_GET['category'] : '';
    // $asc=isset($_GET['top']) ? $_GET['top'] : '';
    // $desc=isset($_GET['low']) ? $_GET['low'] : '';
    $status=isset($_GET['status']) ? $_GET['status'] : '';
    // 编写SQL语句
    
    $sql="select * from goods";
    if($cate){
        $sql .=" where category='$cate'";
    }
    // select * from student order by age 降序desc/升序asc;
    if($status=='top'){
        $sql .=" order by price asc";
    }
    if($status=='low'){
        $sql .=" order by price desc";
    }
    // 执行SQL语句
    $result=$conn->query($sql);
    $row=$result->fetch_all(MYSQLI_ASSOC);

    $result->free();

    // 关闭连接
    $conn->close();

    $res = array(
        'data'=>array_slice($row, ($pageNo-1)*$num,$num),
        'total'=>count($row)
    );

    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>