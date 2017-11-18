jQuery(function($){
    // 限制用户名的格式
    var _username;
    var _password;
    $('#username').on('blur',function(){
         _username=$('#username')[0].value;
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
                if(res=="fail"){
                    $('#username_tell').html('用户已注册').css('color','red');
                    return false;
                }
                else if(res=="ok"){
                    $('#username_tell').html('牛逼啊').css('color','green');
                }

            }
        }
        xhr.open("get","http://localhost/1201/api/login.php?username="+_username,true);
        xhr.send(null);
        
    });
    
    // 限制密码的格式
    $('#password').on('blur',function(){
        if(!(/^[\w\-]{8,16}$/).test(_password)){
            $('#password_tell').html('格式不对').css('color','red');
            return false;
        }
        else{
            $('#password_tell').html('牛逼啊').css('color','green');
            _password=$('#password')[0].value;
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
        console.log(_password);
        var color_username=$('#username_tell').css('color');
        var color_password=$('#password_tell').css('color');
        var choose=$('#choose');
        // console.log(choose.prop('checked'));
        var color_yzm=$('#yzm_tell').css('color');
        if(color_username=='rgb(0, 128, 0)'&&color_password=='rgb(0, 128, 0)'&&color_yzm=='rgb(0, 128, 0)'){
            // &&choose.prop('checked')=='true'
            var xhr2=new XMLHttpRequest();
            xhr2.onreadystatechange=function(){
            if(xhr2.readyState==4){
                var res=xhr2.responseText;
                console.log(res);
                if(res=="ok"){
                   alert('恭喜你，成功注册!');
                }else{
                    alert('兄弟，没操作成功啊');
                }              
            }
        }
            xhr2.open("get",`http://localhost/1201/api/login.php?username=${_username}&password=${_password}`,true);
            xhr2.send(null);
        }

    });
    // footer样式插入页面
    $('#footer').load('footer2.html');
});