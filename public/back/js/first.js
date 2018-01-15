/**
 * Created by 老夏 on 2018/1/13.
 */
;(function(){
  var page = 1;
  var pageSize = 5;

  var render = function(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        var result = template("tpl",info);
        $("tbody").html(result);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorversion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total / info.size),
          onPageClicked:function(a,b,c,p){
            page=p,
              render();
          }
        });

      }
    })
  }
render();
//  添加事件
  $(".btn_add").on("click",function(){
    $("#addModal").modal("show");

  });
//  表单验证
  var $form = $("form");
  $form.bootstrapValidator({
    feedbackIcons:{
      valid:'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating:'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"一级分类的名称不能为空",
          }
        }
      }
    }
  });

  $form.on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:"category/addTopCategory",
      data:$form.serialize,
      success:function(info){
        if(info.success){
          $("#addModal").modal("hide");
          page=1;
          render();

          //重置表单
          $form.data("bootstrapValidator").resetForm(true);

        }
      }
    })
  })


});