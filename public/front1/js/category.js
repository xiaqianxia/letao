/**
 * Created by 老夏 on 2018/1/15.
 */
;(function(){
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    success: function (info) {

      $(".category_left .mui-scroll").html(template("tpl_left", info));

      renderSecond(info.rows[0].id);
    }

  });


//

function renderSecond(id){
  $.ajax({
    type:'get',
    url:"/category/querySecondCategory",
    data:{
      id:id
    },
    success:function(info){
      $(".category_right .mui-scroll").html(template("tpl_right",info));
    }

  })
}



  $(".category_left .mui-scroll").on("click","li",function () {
      $(this).addClass("now").siblings().removeClass("now");
    var id = $(this).data("id");
    renderSecond(id);
    mui(".mui-scroll-wrapper").scroll()[1].scrollTo(0,0,500)
  })




});