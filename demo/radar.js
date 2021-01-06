import KedouBot from '../src/KedouBot.js'

const users = {}
const bot = new KedouBot('小雷达')
bot.onSend(str => {
    console.log('发送', str)
})
bot.onMessage(str => {
    const data = JSON.parse(str)
    if (data.type == 'message') {
        console.log('收到:', data)
        if (data.message in users) {
            const user = users[data.message]
            bot.say(`${user.name} 在 ${user.x},${user.y}`)
        }
    } else {
        users['find:' + data.name] = {
            name: data.name,
            x: data.x,
            y: data.y
        }
    }
})

setInterval(() => {
  bot.moveRandom()
}, Math.random() * 500 + 10000)
