jQuery(function($){
    var params;
    // 点击左边商品分类传参到列表页
    $('.nav_l').on('click','li',function(){
        var target=$(this).children('.liSmall').find('p').first().children('a').text();
         params='?'+target;
         location.href='html/list.html'+params;
    });
    //点击上边导航条把商品分类传参到列表页
    $('.nav_top').on('click','li',function(){
        var target2=$(this).find('a').text();
         params='?'+target2;
         location.href='html/list.html'+params;
    });
    //中间的2个轮播图
    //第一个
    $('.carousel').lyCarousel({imgs:['images/index/lunbo1.jpg','images/index/lunbo2.jpg','images/index/lunbo3.jpg','images/index/lunbo4.jpg','images/index/lunbo5.jpg','images/index/lunbo6.jpg'],width:528,height:266,duration:2000,type:'horizontal'});
    // 第二个
    $('.carousel2').lyCarousel({imgs:['images/index/lunbo1.jpg','images/index/lunbo2.jpg','images/index/lunbo3.jpg','images/index/lunbo4.jpg','images/index/lunbo5.jpg','images/index/lunbo6.jpg'],width:528,height:200,duration:2000,type:'horizontal'});
    // Nav的Tab标签切换
     var $gg_newBox=$('.gg_new').children('div');
        $gg_newBox.slice(1).hide();
        var $nav=$('.gg_nav');
        $nav.children('li').first().addClass('light');
        $nav.on('mouseenter','li',function(){
            var $index=$(this).index();
            $(this).addClass('light').siblings('li').removeClass('light');
            $gg_newBox.eq($index).show().siblings('div').hide();

            });
    // LOGO的显示隐藏
    $('.logo_hide').hide();
            $('.logo_box').on('mouseover','li',function(){
                $(this).children('.logo_hide').show();
                $(this).siblings('li').children('.logo_hide').hide();
            }).on('mouseleave','li',function(){
                $(this).children('.logo_hide').hide();
            });
    // Main左边的显示隐藏
    $('.main_hide').hide();
                $('.main_li').on('mouseover',function(){
                    $(this).children('.main_show').css('opacity',0.4).find('p').hide();
                    $(this).children('.main_show').next('.main_hide').show();         
                }).on('mouseleave',function(){
                 $(this).children('.main_show').css('opacity',1).find('p').show();
                $(this).children('.main_show').next('.main_hide').hide();
                });
    //news的轮播图
    $('.news_lunbo').lyCarousel({imgs:['images/index/news_lunbo1.jpg','images/index/news_lunbo2.jpg','images/index/news_lunbo3.jpg','images/index/news_lunbo1.jpg'],width:376,height:212,duration:2000,type:'horizontal'});

    // 显示隐藏links
    $('.links_btn').on('click',function(){
        $('.links_all').slideToggle();
    });
    // footer样板插入
    $('#footer').load('html/footer.html');
});