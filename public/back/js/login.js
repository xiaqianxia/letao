/**
 * Created by 老夏 on 2018/1/11.
 */
$(function() {
  var $form = $("form");
  //表单校验插件 在表单提交的时候做校验
  //如果失败了 会阻止表单的提交 如果校验成了 他就会提交

  //表单插件初始化
  $form.bootstrapValidator({
    //  用户名不能为空 密码不能为空  长度是6-12位
    feedbackIcons:{
      valid:'glyphicon glyphicon-heart',
      invalid:'glyphicon glyphicon-remove',
      validating:'glyphicon glypphicon-refresh'
    },

    //  配置校验规则
    fields: {
      username: {
        validators: {
          //  里面可以配置username 所有的校验
          notEmpty: {
            //  非空校验
            message: "用户名不能为空"
          },
          callback:{
            message:"用户名错误"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空哦"
          },

          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "密码必须是6-12为哦"
          },

          //用于校验失败后提示的信息

          callback:{
            message:"密码输入错误"
          },
        }
      }
    }


  });
//需要给表单注册一个校验成功的诗句 这个事件在表单校验成功的时候触发
  $form.on("success.form.bv",function(e){
  //  阻止表单提交
    e.preventDefault();

  //  发送ajax请求
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      dataType:"json",//注册dataType:jquery 会根据后端返回的类型自动识别
      data:$form.serialize(),
      success:function(info){
      //  登陆成功
        if(info.success){
          location.href = "index.html";
        }
        //失败
        if(info.error == 1000){
          //updatastatus 方法 把用户名改成失败即可
          //用于获取插件的使用 通过这个实例可以调用方法
          //3个参数

          $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
          //alert(info.message);
        }
        if(info.error== 1001){
          //alert(info.message);
          $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    });

  });



});




//  var $form = $("form");
//  $form.bootstrapValidator({
//    feedbackIcons:{
//    //  配置校验是的图标
//      feedbackIcons:{
//        valid:'glyphicon glyphicon-ok',
//        invalid:'glyphicon glyphicon-remove',
//        validation:'glyphicon glyphicon-refresh'
//      },
//    //  配置校验的规则
//      fields:{
//        username:{
//        //  username 的规则
//          validators:{
//            notEmpty:{
//              message:"用户名不能为空"
//            },
//            callback:{
//              message:"用户名不存在"
//            }
//          }
//        },
//        password:{
//          validators:{
//            notEmpty:{
//              message:"用户名不能为空",
//            },
//            stringLength:{
//              min:6,
//              max:12,
//              message:"密码长度是6-12位"
//            },
//            callback:{
//              message:"密码错误"
//            }
//          }
//        }
//      }
//    }
//  });
//  $form.on("success.form.bv",function(e){
//  //  阻止浏览器的默认行为
//    e.preventDefault();
//    $.ajax({
//      type:"post",
//      url:"/employee/employeeLogin",
//      data:$form.serialize(),
//      success:function(data){
//        if(data.success){
//          location.href = "index.html";
//        }
//        if (data.error === 1000){
//
//        }
//      }
//    })
//  })
//
//})
//
//
//$(function () {
//
//        if(data.error === 1000){
//          //alert("用户名不存在");
//
//          //手动调用方法，updateStatus让username校验失败即可
//          //第一个参数：改变哪个字段
//          //第二个参数：改成什么状态  VALID:通过  INVALID:不通过
//          //第三个参数：选择提示的信息
//          $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
//        }
//
//        if(data.error === 1001){
//          //alert("密码错误");
//
//          $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
//        }
//      }
//
//    });
//
//  });
//
//
//  //重置功能，重置样式
//  $("[type='reset']").on("click", function () {
//
//    //重置样式
//    $form.data("bootstrapValidator").resetForm();
//
//  });
//
//
//});