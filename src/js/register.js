jQuery(function($){
    $('#footer').load('footer2.html');
    var _username;
    var _password;
    $('#login').on('click',function(){
         _username=$('#username')[0].value;
         _password=$('#password')[0].value;
          var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                var res=xhr.responseText;
                console.log(res)
                if(res=="ok"){
                   alert('恭喜你 成功登陆');
                   location.href='../index.html';
                }
                else if(res=="fail"){
                  alert('傻的吧？没你这货啊！');
                }

            }
        }
        xhr.open("get",`http://localhost/1201/api/register.php?username=${_username}&password=${_password}`,true);
        xhr.send(null);
    });
});