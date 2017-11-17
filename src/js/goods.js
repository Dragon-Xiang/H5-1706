 jQuery(function($){
    //点击选取颜色
    //获取来自列表页传参过来的ID
    var paramsId=location.search;
    // paramsId=decodeURI(paramsId);
    paramsId=paramsId.slice(1);
    console.log(paramsId);
    var fdj=$('.fdj')[0];
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            var res=JSON.parse(xhr.responseText);
            fdj.innerHTML=res.map(function(item){
                return `<img src="${item.imgrul}" data-big="${item.imgrul}">`
            }).join('');
            $('.fdj').gdsZoom({height:400})
            res.forEach(function(item){
                $('#price').html(item.price);
            });
        }
    }
    xhr.open('get',`http://localhost/1201/api/goods.php?paramsId=${paramsId}`,true);
        xhr.send();
    $('#color_all').on('click','span',function(){
        $(this).css('border','1px solid red').siblings('span').css('border','none');
    });
    $('#size_all').on('click','span',function(){
        $(this).css('border','1px solid red').siblings('span').css('border','none');
    });
    // 点击数量增加
    var index_qty=0;
    $('#jia').on('click',function(){
        index_qty++;
        $('#qty').text(index_qty);
    });
    $('#jian').on('click',function(){
        index_qty--;
        if(index_qty<0){
            index_qty=0;
        }
        $('#qty').text(index_qty);
    });
    $('#header').load('header.html');
    $('#footer').load('footer2.html');
 });