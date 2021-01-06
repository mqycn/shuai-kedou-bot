import KedouBot from '../src/KedouBot.js'
import fs from 'fs'
import path from 'path'
const dataFile = path.resolve('data-traveler.x')

console.log(`restore from ${dataFile}`)

const getUnixTime = () => new Date().getTime() / 1000

const bot = new KedouBot('旅行者向西')
bot.light = "on"
bot.angle = 90
bot.lastSayHello = getUnixTime()
bot.onSend((str) => {
    console.log(`${bot.name} -> ${str}`)
})

bot.onMessage((str) => {
    if (str.indexOf('"message":"@\\u65c5\\u884c\\u8005\\u5411\\u897f"') != -1 || str.indexOf('"message":"@旅行者向西"') != -1) {
        bot.say(`收到，我的坐标：${bot.x.toFixed(3)},${bot.y.toFixed(3)}`)
    }
    console.log(`${bot.name} <- ${str}`)
})
if (fs.existsSync(dataFile)) {
    setTimeout(() => {
        bot.x = parseFloat(fs.readFileSync(dataFile, "UTF-8"))
        bot.update()
    }, 1000)
}

setInterval(() => {
    bot.x -= bot.random(10, 50)
    bot.y = bot.randomXY()
    bot.update()
    fs.writeFileSync(dataFile, bot.x.toString(), "UTF-8")
    if (getUnixTime() - bot.lastSayHello > 600) {
        bot.say(`我当前坐标：${bot.x.toFixed(3)},${bot.y.toFixed(3)} 十分钟后会再次报告我的位置`)
        bot.lastSayHello = getUnixTime()
    }
}, Math.random() * 500 + 10000)
