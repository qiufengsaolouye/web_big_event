$(function () {
    form.verify({
        nickname: [
            /^[\S]{1,6}$/,
            '昵称长度必须在1到6位之间！'
        ]
    })

    initUserInfo()

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                // console.log($('.layui-form').serialize())
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })

    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })


})
let form = layui.form
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            form.val('formData', res.data)
        }
    })
}