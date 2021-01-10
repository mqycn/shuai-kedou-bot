import KedouBot from '../src/KedouBot.js'

let userData = ""
const users = {}
const userMap = () => JSON.stringify(Object.keys(users).map(userId => userId))

const bot = new KedouBot('小雷达')
bot.momentum = 0
bot.onSend(str => {
    console.log('发送', str)
})

bot.onMessage(str => {
    const data = JSON.parse(str)
    if (data.type == 'message') {
        console.log('收到:', data)
        if (data.message.indexOf("find:") != -1) {
            const findName = data.message.substr(5)
            const result = []
            Object.keys(users).forEach(id => {
                const user = users[id];
                if (user.name == findName) {
                    result.push(`${user.name}(${user.id}) 在 ${user.x},${user.y}`)
                }
            })
            if (result.length == 0) {
                result.push(`抱歉${bot.name}没有找到：${findName}`)
            }
            users[data.id] && bot.teleport(users[data.id].x, users[data.id].y)
            setTimeout(function () {
                result.forEach(message => bot.say(message))
            }, 1000);
            console.log(data.id, result)
        }
    } else if (data.type == 'update') {
        if (data.x && data.y && !isNaN(data.x) && !isNaN(data.y)) {
            users[data.id] = {
                name: data.name,
                id: data.id,
                x: parseInt(data.x),
                y: parseInt(data.y)
            }
        }
    } else if (data.type == 'closed') {
        delete users[data.id]
    }
})

setInterval(() => {
    bot.x = bot.x + bot.random(-30, 30)
    bot.y = bot.y + bot.random(-30, 30)
    bot.update()
    const currentData = userMap()
    if (currentData != userData) {
        userData = currentData
        console.log("userlist", users)
    }
}, Math.random() * 500 + 10000)
