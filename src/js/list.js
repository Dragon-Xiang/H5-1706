jQuery(function($){
        // 在json获取数据并存入
        var pageNo=1;
        var num=12;
        var top='';
        var low='';
        var status;
        var xhr=new XMLHttpRequest();
        var params=location.search;
        params=decodeURI(params);
        target=params.slice(1);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                var res=JSON.parse(xhr.responseText);
                console.log(res);
                function show(){
                     return res.data.map(function(item){
                            return `<li data-guid="${item.id}">
                                    <img src="${item.imgrul}"/>
                                    <p>${item.details}</p>
                                    <p>
                                        <span>￥</span>
                                        <span>${item.price}</span>
                                        <span>X</span>
                                        <span>1</span>
                                        <button>加入购物车</button>
                                    </p>
                                </li>`
                        }).join('');
                }
                
                $('.goods_box')[0].innerHTML=show();
                // 点击价格从高往低排序
                $('.gao')[0].onclick=function(){
                    top='top';
                    status='top';
                    xhr.open('get',`http://localhost/1201/api/list.php?pageNo=${pageNo}&num=${num}&status=${status}&category=${target}`,true);
                    xhr.send();
                    $('.goods_box')[0].innerHTML=show();
                }
                 // 点击价格从低往高排序
                 $('.di')[0].onclick=function(){
                    low='low';
                    status='low';
                    xhr.open('get',`http://localhost/1201/api/list.php?pageNo=${pageNo}&num=${num}&status=${status}&category=${target}`,true);
                    xhr.send();
                    $('.goods_box')[0].innerHTML=show();
                }
                var page_len=Math.ceil(res.total/num);               
                $('#all_qty').html(res.total);
                var $page=$('.page');
                $page.html('');
                for(var i=0;i<page_len;i++){
                    var $span=$('<span>/').text(i+1);
                    if(i+1===pageNo){
                        $span.addClass('active');
                    }
                    $span.appendTo($page);
                }

            }
        }
        xhr.open('get',`http://localhost/1201/api/list.php?category=${target}&pageNo=${pageNo}&num=${num}&status=${status}`,true);
        xhr.send();
        // 点击图片，把当前ID传参到详情页
        $('.goods_box').on('click','li',function(){
            var targetId=$(this).attr('data-guid');
            var paramsId='?'+targetId;
            location.href='goods.html'+paramsId;

            console.log(targetId)
        });
        // 点击下一页
        $('.page')[0].onclick = function(e){
            if(e.target.tagName.toLowerCase() === 'span'){
                pageNo = e.target.innerText*1;
                xhr.open('get',`http://localhost/1201/api/list.php?pageNo=${pageNo}&num=${num}&status=${status}&category=${target}`,true);
                xhr.send();
            }
        }
        // 判断是否存在COOKIE
        var cookie=Cookie.get('datalist');
        var datalist;
        if(!cookie){
            datalist=[];         
        }else{
            datalist=JSON.parse(cookie);
            console.log(datalist);
            var fly_box=$('.fly_box')[0];
            fly_box.innerHTML+=datalist.map(function(item){
                return `<li data-guid="${item.guid}">
                            <img src="${item.imgrul}" />
                            <p>${item.details}</p>
                            <p>
                                <span>￥</span>
                                <span>${item.price}</span>
                                <span>X</span>
                                <span>${item.qty}</span>
                            </p>
                            <span class="close">&times;</span>
                        </li>`
            }).join('');
        }
    // 飞入购物车
    var $goods_box=$('.goods_box');
    var $fly_box=$('.fly_box');
    // 点击加入购物车事件
    $('.goods_box').on('click','button',function(){
        var $currentLi=$(this).closest('li');
        var $img=$currentLi.children('img');
        var $copyImg=$img.clone().css({position:'absolute',width:$img.width(),height:$img.height(),top:$img.offset().top,left:$img.offset().left});
        $('body').append($copyImg);
        $copyImg.animate({width:80,height:80,top:($fly_box.offset().top+$fly_box.height()),left:$fly_box.offset().left},function(){
            $copyImg.remove();
            var $copyLi=$currentLi.clone().appendTo($fly_box);
            var $delateBtn=$copyLi.children('p').last().children('button').remove();
            var $close=$('<span>/').html('&times;').addClass('close').appendTo($copyLi);
        });
        // 数据存入COOKIE
        var currentLi=this.parentNode.parentNode;
        var goodsId=currentLi.getAttribute('data-guid');
        var currentId;

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
                imgrul:currentLi.children[0].src,details:currentLi.children[1].innerHTML,price:currentLi.children[2].children[1].innerHTML
            }
            datalist.push(goods);            
        }
        Cookie.set('datalist',JSON.stringify(datalist));
    });
    // 点击购物车的删除 并且删除COOKIE的数据
    $fly_box.on('click','.close',function(){
            $(this).closest('li').remove();
            var closeLi=this.parentNode;
            var delateId;
            var res=datalist.some(function(item,idx){
                delateId=idx;
                console.log(delateId);
                return item.guid==closeLi.getAttribute('data-guid')
            });
            console.log(datalist);
            if(res){console.log(datalist)
                datalist.splice(delateId,1);
            }
            Cookie.set('datalist',JSON.stringify(datalist));
            // location.reload();
        });
    $('#header').load('header.html');
    $('#footer').load('footer2.html');
});