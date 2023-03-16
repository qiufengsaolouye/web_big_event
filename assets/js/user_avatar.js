$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)

    let layer = layui.layer

    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        let filelist = e.target.files
        // console.log(filelist)
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }
        //1. 拿到用户选择的文件
        let file = filelist[0]
        // 2. 将文件，转化为路径
        let imgURL = URL.createObjectURL(file)
        // console.log(imgURL)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        
        $.ajax({
            method:'POST',
            url:'/my/update/avatar',
            data:{
                avatar:dataURL
            },
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('图片更换成功！')
                window.parent.getUserInfo()
            }
        })
    })


})