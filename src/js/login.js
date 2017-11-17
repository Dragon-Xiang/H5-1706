jQuery(function($){
    // 限制用户名的格式
    
    $('#username').on('blur',function(){
        var _username=$('#username')[0].value;
        if(!(/^1[34578]\d{9}$|^[a-z0-9][\w\-\.]{2,}@[a-z0-9\-]+(\.[a-z]{2,})+$/).test(_username)){
            $('#username_tell').html('格式不对').css('color','red');
            return false;
        }
        else{
            $('#username_tell').html('牛逼啊').css('color','green');
        }
    // 判断用户名是否存在
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                var res=xhr.responseText;
                if(res=="no"){
                    $('#username_tell').html('用户已注册').css('color','red');
                    return false;
                }
                else if(res="yes"){
                    $('#username_tell').html('牛逼啊').css('color','green');
                }

            }
        }
        xhr.open("get","http://localhost/1201/api/login_username.php?username="+_username,true);
        xhr.send(null)
        
    });
    
    // 限制密码的格式
    $('#password').on('blur',function(){
        var _password=$('#password')[0].value;
        if(!(/^[\w\-]{8,16}$/).test(_password)){
            $('#password_tell').html('格式不对').css('color','red');
            return false;
        }
        else{
            $('#password_tell').html('牛逼啊').css('color','green');
        }
    });
    // 验证验证码
    createYZM();
    // 封装生成验证函数
    var Code;
    function createYZM(){
        var code =parseInt(Math.random()*10000);
        if(code<10){
            code='000'+code;
        }
        else if(code<100){
            code='00'+code;
        }
        else if(code<1000){
            code='0'+code;
        }
        Code=code;
        $('#yzm_show').html(Code);
    }
    $('#reset').on('click',function(){
        createYZM();
    });
    $('#yzm').on('blur',function(){
        var _yzm=$('#yzm')[0].value;
        if(_yzm!=Code){
            $('#yzm_tell').html('验证错误').css('color','red');
            createYZM();
        }
        else{
            $('#yzm_tell').html('牛逼啊').css('color','green');
        }
    });
    // 点击登录
    $('#zhuce').on('click',function(){
        var color_username=$('#username_tell').css('color');
        var color_password=$('#password_tell').css('color');
        var choose=$('#choose');
        console.log(choose.prop('checked'));
        var color_yzm=$('#yzm_tell').css('color');
        if(color_username=='rgb(0, 128, 0)'&&color_password=='rgb(0, 128, 0)'&&color_yzm=='rgb(0, 128, 0)'&&choose.prop('checked')=='true'){
            alert('恭喜你，成功注册!');
        }

    });
    // footer样式插入页面
    $('#footer').load('footer2.html');
});