# 蝌蚪机器人

机器人以 vscode扩展 我爱掘金 中的蝌蚪池塘为基础开发，兼容 workerman 开发的蝌蚪池塘。

## 安装说明

```bash

# 下载最新代码
git clone https://github.com/mqycn/shuai-kedou-bot.git
cd shuai-kedou-bot

# 安装依赖
npm install

# 启动机器人
node demo/clock.js
```


## 已经完成的机器人

- 报时机器人
  - 文件：**demo/clock.js**
  - 没到整点时会广播当前时间，比如：12:00
  - 如果收到 **time** 或 **now** 命令时，会广播当前时间
- 小雷达
  - 文件：**demo/radar.js**
  - 池塘百晓生，会在暗处偷偷监视池塘中的用户
  - 当收到 **find:用户昵称** 时，会像广播 查找用户的坐标 
- 旅行者向西
  - 文件：**demo/traveler.js**
  - 一个孤独的旅行者，一直向西游的小蝌蚪
  - 每隔10分钟报告一次自己的坐标
  - 当收到 **@孤独的旅行者** 的命令时，会广播自己的坐标
- 光之国管家
  - 进入 我爱掘金 中的蝌蚪池塘中的菜单光之国，光之国管家会有欢迎信息
  - 文件：**demo/ultraman.js**


## 核心类 KedouBot

### 属性
- name  蝌蚪名称
- momentum 蝌蚪速度
- sex 蝌蚪性别
- x  X坐标
- y  Y坐标
- angle 蝌蚪头角度
- 我爱掘金扩展蝌蚪世界专有属性
  - color 蝌蚪颜色
  - size  蝌蚪大小
  - from 平行世界名称
  - light  设置是否发光


### 方法

- 获取随机数 random(最小数, 最大数)
- 获取在世界入口可是区域中的随机位置 randomXY()
- 获取随机角度 randomAngle()
- 蝌蚪随机移动 moveRandom()
- 设置蝌蚪属性后更新方法 update()
- 发送广播 say(广播的文本信息)
- 传送到某个坐标 teleport(x, y)

### 事件

- 当向服务器发送信息时 onSend(callback)
  - 向主服务器发送信息 sendToServer(jsonData)
- 当从服务器收到信息时 onMessage(callback)
  - 从主服务器接受信息 messageFromServer(str)


## 报时机器人案例

可以直接用 ```npm run test``` 启动报时机器人

```javascript
import KedouBot from '../src/KedouBot.js'

const lastDate = {
    last: '',
    now() {
        const date = new Date()
        return date.getHours() + ':00'
    }
}
lastDate.last = lastDate.now()

let bot = new KedouBot('报时机器人')
bot.onSend((str) => {
    console.log(`${bot.name} -> ${str}`)
})
bot.onMessage((str) => {
    console.log(`${bot.name} <- ${str}`)
    if (str.indexOf('"message":"now"') != -1 || str.indexOf('"message":"time"') != -1) {
        const date = new Date()
        bot.say(`当前时间：${date.getHours()}:${date.getMinutes()}`)
    }
})

setInterval(() => {
    bot.moveRandom()
    const now = lastDate.now()
    if (now != lastDate.last) {
        bot.say(`当前时间：${now}`)
        lastDate.last = now
    }
}, Math.random() * 500 + 10000)

```