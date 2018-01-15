/**
 * Created by 老夏 on 2018/1/13.
 */
$(function(){
  var page = 1;
  var pageSize = 5;

  function render(){
    $.ajax({
      type:"post",
      url:"/user/queryUser",
      data:{
        page:page,
        pageSize:pageSize
      },

      success:function(){
        var result = template("tpl",info);
        $("tbody").html(result);

        $("#paginator").bootstrapPaginator({

          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total / info.size),
          numberOfPages:5,
          onPageClicked:function(a,b,c,p){
            page = p;
            render();
          }

        });
      }
    });
  }

//禁用 启用

  $("tbody").on("click",".btn",function(){
    $("#userModal").modal("show");
    var id = (this).parent().data("id");
    isDelete = (this).hasClass("btn-success")? 1:0;
    $(".btn_confirm").off().on("click",function(){
      $.ajax({
        type:"post",
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },

        success:function(info){
          if(info.success){
            $("userModal").modal('hide');
            render();
          }
        }
      })
    });

  });




});
