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
