jQuery(function($){
    // 获取COOKIE数据生成列表
    var cookie=Cookie.get('datalist');
    if(cookie!=''){
        var datalist=JSON.parse(cookie);       
        var car_box=$('.car_box')[0];
        var allmoney=0;
        car_box.innerHTML+=datalist.map(function(item){
            $('#all')[0].innerHTML='';
            var xiaoji=item.price*item.qty;
            allmoney+=item.price*item.qty;
            if(item.color&&item.size){
                return `<li data-guid="${item.guid}">
                                <ul class="hang_box clearfix">
                                    <li>
                                        <img src="${item.imgrul}" />
                                        <span>
                                            ${item.details}
                                        </span><br />
                                        <span>${item.color}</span>
                                        <span>${item.size}</span>
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
            }else{
                return `<li data-guid="${item.guid}">
                                <ul class="hang_box clearfix">
                                    <li>
                                        <img src="${item.imgrul}" />
                                        <span>
                                            ${item.details}
                                        </span><br />
                                        <span>随机颜色</span>
                                        <span>随机尺寸</span>
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
                }
            }).join('');
        // 算总价
        $('#all')[0].innerHTML=allmoney;     

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
                location.reload();
            });
    }

    // 一键清空购物车
    $('#close_all').on('click',function(){
        $('.car_box').children('li').slice(1,).remove();
        Cookie.remove('datalist');
    });
    $('#xiadan').on('click',function(){
        alert('水鱼,谢谢'+allmoney+'元');
    });
    $('#header').load('header.html');
    $('#footer').load('footer2.html');
});