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
                return `<img src="${item.imgrul}" guid="${item.id}"data-big="${item.imgrul}">`
            }).join('');
            // 放大镜调用插件
            $('.fdj').gdsZoom({height:400})
            res.forEach(function(item){
                $('#price').html(item.price);
                $('#money').html(item.price);
                $('.details').html(item.details);
            });
        }
    }
    xhr.open('get',`http://localhost/1201/api/goods.php?paramsId=${paramsId}`,true);
        xhr.send();
    var color;
    $('#color_all').on('click','span',function(){
        $(this).css('border','1px solid red').siblings('span').css('border','none');
        // 获取color值
        color=$(this).text();
    });
    var size;
    $('#size_all').on('click','span',function(){
        $(this).css('border','1px solid red').siblings('span').css('border','none');
        // 获取size值
        size=$(this).text();
    });
    // 点击数量增加
    var index_qty=1;
    $('#jia').on('click',function(){
        index_qty++;
        $('#qty').text(index_qty);
        $('#qty_quanbu').text(index_qty);
        $('#money').text(index_qty*$('#price').text());
    });
    $('#jian').on('click',function(){
        index_qty--;
        if(index_qty<0){
            index_qty=0;
        }
        $('#qty').text(index_qty);        
        $('#qty_quanbu').text(index_qty);
        $('#money').text(index_qty*$('#price').text());
    });
    // 获取COOKIE的数据
    var cookie=Cookie.get('datalist');
    var datalist;
    if(!cookie){
        datalist=[];         
    }else{
        datalist=JSON.parse(cookie);
        console.log(datalist);
    }
    $('#buy').on('click',function(){
        // 获取数量值
        var qty=$('#qty').text();
        var currentgoods=$('.fdj').find('img')[0];
        var goodsId=currentgoods.getAttribute('guid');
        var res=datalist.some(function(item,idx){
            currentId=idx;
            return item.guid==goodsId;
        });
        if(res){
            datalist[currentId].qty++;
        }
        else{
            var goods={
                guid:goodsId,qty:1,
                imgrul:currentgoods.src,
                details:$('.details')[0].innerHTML,
                price:$('#price').text(),
                color:color,
                size:size,
                qty:qty
            }
            datalist.push(goods);            
        }
        Cookie.set('datalist',JSON.stringify(datalist));
        alert('哈哈，水鱼你给坑了啊');
        location.href('car.html'); 
    });
    $('#header').load('header.html');
    $('#footer').load('footer2.html');
 });