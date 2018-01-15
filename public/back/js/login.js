/**
 * Created by 老夏 on 2018/1/11.
 */
$(function(){
  var $form = $("form");
  $form.bootstrapValidator({
    feedbackIcons:{
    //  配置校验是的图标
      feedbackIcons:{
        valid:'glyphicon glyphicon-ok',
        invalid:'glyphicon glyphicon-remove',
        validation:'glyphicon glyphicon-refresh'
      },
    //  配置校验的规则
      fields:{
        username:{
        //  username 的规则
          validators:{
            notEmpty:{
              message:"用户名不能为空"
            },
            callback:{
              message:"用户名不存在"
            }
          }
        },
        password:{
          validators:{
            notEmpty:{
              message:"用户名不能为空",
            },
            stringLength:{
              min:6,
              max:12,
              message:"密码长度是6-12位"
            },
            callback:{
              message:"密码错误"
            }
          }
        }
      }
    }
  });
  $form.on("success.form.bv",function(e){
  //  阻止浏览器的默认行为
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$form.serialize(),
      success:function(data){
        if(data.success){
          location.href = "index.html";
        }
        if (data.error === 1000){

        }
      }
    })
  })

})


$(function () {

        if(data.error === 1000){
          //alert("用户名不存在");

          //手动调用方法，updateStatus让username校验失败即可
          //第一个参数：改变哪个字段
          //第二个参数：改成什么状态  VALID:通过  INVALID:不通过
          //第三个参数：选择提示的信息
          $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }

        if(data.error === 1001){
          //alert("密码错误");

          $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }

    });

  });


  //重置功能，重置样式
  $("[type='reset']").on("click", function () {

    //重置样式
    $form.data("bootstrapValidator").resetForm();

  });


});