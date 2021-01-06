import websocket from "nodejs-websocket"

/**
 * 现在主类已经同时 支持 Nodejs 和 Chrome控制台环境
 * Chrome控制台环境请从 class 开始复制
 */
export default class KedouBot {
    constructor(name = "小机器人", from = "juejin") {
        this.name = name
        this.from = from
        this.momentum = 2
        this.sex = ""
        this.color = "#DB524A" // 设置颜色
        this.size = 8 // 设置大小
        this.from = from
        this.light = "on" // 设置是否发光
        this.x = 0 // X坐标
        this.y = 0 // Y坐标
        this.angle = 0 //角度
        this.connect()
    }

    // 连接服务器
    connect() {
        const server = "ws://kedou.workerman.net:8280/"
        if (typeof WebSocket == 'function') {
            // 浏览器环境
            this.$connect = new WebSocket(server)
            this.$connect.onmessage = (event) => {
                this.messageFromServer(event.data)
            }
        } else {
            // NodeJS 环境
            this.$connect = websocket.connect(server)
            this.$connect.on("text", (data) => {
                this.messageFromServer(data)
            })
        }
    }

    // 获取随机数
    random(start, end) {
        return Math.random() * (end - start) + start
    }

    // 随机位置
    randomXY() {
        return this.random(-300, 300)
    }

    // 随机角度
    randomAngle() {
        return this.random(0, 360)
    }

    // 随机移动
    moveRandom() {
        this.x = this.randomXY()
        this.y = this.randomXY()
        this.angle = this.randomAngle()
        this.update()
    }

    // 同步数据
    update() {
        this.sendToServer({
            type: "update",
            name: this.name,
            icon: {
                color: this.color,
                size: this.size,
                from: this.from,
                light: this.light
            },
            x: this.x.toFixed(3),
            y: this.y.toFixed(3),
            angle: this.angle.toFixed(3),
            momentum: this.momentum,
            sex: this.sex,
        })
    }

    // 发送消息
    say(message) {
        this.sendToServer({
            type: "message",
            message
        })
    }

    // 传送
    teleport(x, y) {
        this.x = x
        this.y = y
        this.update()
    }

    // 发送数据
    sendToServer(obj) {
        const str = JSON.stringify(obj)
        this._onSend && this._onSend(str)
        this.$connect && this.$connect.send(str);
    }
    onSend(cb) {
        this._onSend = cb
    }

    // 接受数据
    messageFromServer(str) {
        this._onMessage && this._onMessage(str)
        if (str.indexOf(`"type":"welcome"`) != -1) {
            this.moveRandom();
        }
    }
    onMessage(cb) {
        this._onMessage = cb
    }
}