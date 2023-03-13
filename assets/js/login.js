$(function () {
    // 点击注册按钮，进行注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录按钮，进行登录
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // $('.layui-form').on('submit', function (e) {
    //     e.preventDefault()
        
    // })
    let form = layui.form
    let layer=layui.layer
        form.verify({
            // 自定义了一个叫做 pwd 校验规则
            password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            // 校验两次密码是否一致的规则
            repassword: function (value) {
                // 通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败,则return一个提示消息即可
                let password = $('.reg-box [name=password]').val()
                if (value !== password) {
                    return '两次密码不一致！'
                }
            }
        })

    //注册
    $('.reg-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/reguser',
            data:{
                username:$('.reg-box [name=username]').val(),
                password:$('.reg-box [name=password]').val()
            },
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                $('#link_login').click()
            }
        })
    })

    //登录
    $('.login-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:{
                username:$('.login-box [name=username]').val(),
                password:$('.login-box [name=password]').val()
            },
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!')
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }
        })
    })
})