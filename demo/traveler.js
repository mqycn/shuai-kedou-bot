import KedouBot from '../src/KedouBot.js'

const getUnixTime = () => new Date().getTime() / 3600

const bot = new KedouBot('旅行者只会向西')
bot.color = '#0000FF'
bot.light = "on"
bot.angle = 90
bot.lastSayHello = 0
bot.onSend((str) => {
    console.log(`${bot.name} -> ${str}`)
})
bot.onMessage((str) => {
    console.log(`${bot.name} <- ${str}`)
})

setInterval(() => {
    bot.x -= bot.random(10, 50)
    bot.update()
    if (getUnixTime() - bot.lastSayHello > 600) {
        bot.say(`我当前坐标：${bot.x.toFixed(3)},${bot.y.toFixed(3)} 十分钟后会再次报告我的位置`)
        bot.lastSayHello = getUnixTime()
    }
}, Math.random() * 500 + 10000)
