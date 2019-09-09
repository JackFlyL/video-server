// 静态服务器
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.listen(8080, () => {
    console.log(`App listening at port 8080`)
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// 设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});



// post请求
var rtsp = 0
// app.post('/demo', function (req, res) {

//     console.log(JSON.stringify(req.body.rtsp))

//     var data = {
//         rtsp: 'rtsp://admin:jd123456@172.16.154.62:554/cam/realmonitor?channel=10&subtype=1'
//     }
//     res.send(data);
//     if (rtsp == 0) {
//         console.log('开始')
//         startPlay('rtsp://admin:jd123456@172.16.154.62:554/cam/realmonitor?channel=10&subtype=1', '3333');
//         startPlay('rtsp://admin:jd123456@172.16.154.62:554/cam/realmonitor?channel=9&subtype=1', '4444');
//         startPlay('rtsp://admin:jd123456@172.16.154.62:554/cam/realmonitor?channel=8&subtype=1', '5555');
//         startPlay('rtsp://admin:jd123456@172.16.154.62:554/cam/realmonitor?channel=7&subtype=1', '1111');
//         rtsp = JSON.stringify(req.body.rtsp)
//     } else {

//     }

// });

const Stream = require('node-rtsp-stream-jsmpeg')
const moment = require('moment')
moment.locale('zh-cn')


const restart = true; //防视频流断开，建议先测试断流时间
const restartTime = 1 * 60000 //防崩溃时间


// 初始化加载
var playList = [];
启动任务
for (var i = 0; i < 50; i++) {
    const options = {
        name: 'streamName' + i,
        url: 'rtsp://admin:jd123456@172.16.154.62:554/cam/realmonitor?channel=7&subtype=1',
        wsPort: i + '277'
    }

    playList[i] = new Stream(options)
    playList[i].start()
}
if (restart == true) {
    setInterval(() => {
        // 定时kill ffmpeg
        // var callfile = require('child_process');

        // callfile.exec('sh stop.sh', null, function (err, stdout, stderr) {
        //     console.log(stdout);
        //     // 关闭websocker端口
        //     for (var i = 0; i < 50; i++) {

        //         playList[i].stop()
        //     }
        //     // 重启
        //     for (var i = 1; i < 10; i++) {
        //         const options = {
        //             name: 'streamName' + i,
        //             url: 'rtsp://admin:jd123456@172.16.154.62:554/cam/realmonitor?channel=7&subtype=1',
        //             wsPort: i + '277'
        //         }

        //         playList[i] = new Stream(options)
        //         playList[i].start()
        //     }

        // });
        console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
        console.log(restartTime + '执行了')

    }, restartTime);
}