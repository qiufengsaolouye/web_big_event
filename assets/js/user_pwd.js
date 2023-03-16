$(function(){
    let form=layui.form
    let layer=layui.layer
    // 对密码进行验证
    form.verify({
        password:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        newPwd:function(value){
            let oldPwd=$('.layui-form [name=oldPwd]').val()
            if(oldPwd===value){
                return '新密码和旧密码相同！'
            }
        },
        repassword:function(value){
            let newPwd=$('.layui-form [name=newPwd]').val()
            if(newPwd!==value){
                return '两次密码不一致！'
            }
        }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('密码修改成功!')
                $('.layui-form')[0].reset()
            }
        })
    })
})
