$(function () {
    //获取用户的基本信息
    getUserInfo()
    $('#btnLogout').on('click',function(){
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
        function(index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token')
        // 2. 重新跳转到登录页面
        location.href = '/login.html'
        // 关闭 confirm 询问框
        layer.close(index)
        })
    })
})
let layer=layui.layer
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!==0){
                return layer.msg('获取用户信息错误！')
            }
            renderAvatar(res.data)
            
        }
    })
}

function renderAvatar(data){
    let pic=data.user_pic
    let name=data.nickname || data.username
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
    if(pic===null){
        $('.layui-nav-img').hide()
        $('.text-avatar').show().html(name[0].toUpperCase())
    }else{
        $('.layui-nav-img').show().attr('src',pic)
        $('.text-avatar').hide()
    }
}