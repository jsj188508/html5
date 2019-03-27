var el=document.querySelector('#content');
// Ajax请求
function saveOnline(data) {
    var xhr= new XMLHttpRequest();
    xhr.open('POST','/savedata');
    xhr.send('data='+data)
}
//添加事件
el.addEventListener('blur',function () {
    var data=el.value;
    //检测用户是否有网络，
    if(navigator.onLine){ //IE 8+
        saveOnline(data);//如果有，直接发送Ajax请求
    }else{
        //保存在本地 IE 8+
        localStorage.setItem('data',data);
        // localStorage.data=data;        
    }
});
//检测有网络时，触发online事件,发送Ajax请求
window.onLine=function () {
    //从本地获取数据
    var data=localStorage.getItem('data');
    if(!!data){//如果数据存在，就发送Ajax请求
        saveOnline(data);
        localStorage.removeItem('data');
    }
}
/* 离线之后数据的更新；H5 高级API Service Worker ---> IE-No   能否有其他的Api代替
    官网：https://www.w3.org/TR/service-workers/
    Service Worker :是一段运行在浏览器后台进程的脚本，独立于当前页面，并不会直接参与DOM操作;而是通过postMessage (IE8+)与页面通信
    Service Worker主要提供了4类功能;
    后台消息传递
    网络代理
    离线缓存
    消息推送
*/

/*service worker 示例：*/
//注册service worker
navigator.serviceWorker.register('sw.js').then(function (register) {
    console.log('serviceWorker注册成功')
}).catch(function (error) {
    console.log('serviceWorker注册失败')
})

//sw.js 代码如下
// 定义需要缓存的文件
var cacheFiles=['style.css','index.html','index.js'];
//使用install事件处理缓存文件
self.addEventListener('install',function (evt) {
    evt.waitUntil(
        caches.open('mycache').then(function (cache) {
            return cache.addAll(cacheFiles);            
        })
    )    
})

