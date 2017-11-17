jQuery(function($){
    var cookie=Cookie.get('datalist');
    if(cookie!=''){
        var datalist=JSON.parse(cookie);       
        var car_box=$('.car_box')[0];
        car_box.innerHTML+=datalist.map(function(item){
            $('#all')[0].innerHTML='';
            var xiaoji=item.price*item.qty;
            $('#all')[0].innerHTML+=item.price*item.qty;
            return `<li data-guid="${item.guid}">
                            <ul class="hang_box clearfix">
                                <li>
                                    <img src="${item.imgrul}" />
                                    <span>
                                        ${item.details}
                                    </span><br />
                                    <span id="color">粉红色</span>
                                    <span id="size">m</span>
                                </li>
                                <li>
                                    <span>￥</span>
                                    <span>${item.price}</span>
                                </li>
                                <li>
                                    <span class="jian">-</span><span id="qty">${item.qty}</span><span class="jia">+</span>
                                </li>
                                <li>
                                    <span>￥</span>
                                    <span id="xiaoji">${xiaoji}</span>
                                </li>
                                <li>
                                    <span>X</span>
                                    <span class="close">删除</span>
                                </li>
                            </ul>
                        </li>` 
        }).join('');
    // 删除每一栏的商品
        $('.car_box').on('click','.close',function(){
                $(this).closest('ul').parent().remove();
                var closeLi=$($(this).closest('ul').parent())[0];console.log(closeLi)
                var delateId;
                var res=datalist.some(function(item,idx){
                    delateId=idx;
                    console.log(delateId);
                    return item.guid==closeLi.getAttribute('data-guid')
                });
                console.log(res);
                if(res){
                    datalist.splice(delateId,1);
                }
                Cookie.set('datalist',JSON.stringify(datalist));
                // location.reload();
            });
    }
    // 一键清空购物车
    $('#close_all').on('click',function(){
        $('.car_box').children('li').slice(1,).remove();
        Cookie.remove('datalist');
    });
    $('#header').load('header.html');
    $('#footer').load('footer2.html');
});