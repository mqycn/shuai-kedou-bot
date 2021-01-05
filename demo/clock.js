import KedouBot from '../src/KedouBot.js'

const lastDate = {
    last: '',
    now() {
        const date = new Date()
        return date.getHours() + ':00'
    }
}

let bot = new KedouBot('报时机器人')
bot.color = '#FF0000'
bot.light = "on"
bot.onSend((str) => {
    console.log(`${bot.name} -> ${str}`)
})
bot.onMessage((str) => {
    console.log(`${bot.name} <- ${str}`)
})

setInterval(() => {
    bot.moveRandom()
    const now = lastDate.now()
    if (now != lastDate.last) {
        bot.say(`当前时间：${now}`)
        lastDate.last = now
    }
}, Math.random() * 500 + 1000)
