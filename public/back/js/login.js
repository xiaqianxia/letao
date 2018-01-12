/**
 * Created by 老夏 on 2018/1/11.
 */
;(function(){
  var $form = $("form");
  $form.bootstrapValidator({
    feedbackIcons:{
      valid:'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fileds:{
      username:{
        validators:{
          notEmpty:{
            message:
              "用户名不能为空"
          },
          callback:{
            message:
            "用户不存在"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码必须6-12位"
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }

  });
//
  $form.on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$form.serialize(),
      success:function(info){
        if(info.success){
          location.href = "index.html";

        }
        if(info.error == 1000){
          $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if(info.error == 1001){
          $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    });

  });


  $("[type='reset']").on("click",function(){
    $form.data("bootstrapValidator").resetForm();
  });




  ////给reset按钮注册一个点击事件

  //  //重置校验的样式


});