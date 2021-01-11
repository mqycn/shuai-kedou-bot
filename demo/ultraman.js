import KedouBot from '../src/KedouBot.js'

const bot = new KedouBot('光之国管家')
bot.momentum = 0
bot.onSend(str => {
  console.log('发送', str)
})

const message = {
  cache: [],
  send(msg) {
    const time = parseInt(new Date().getTime() / 1000);
    if (this.cache.filter(item => {
      if (item.msg == msg) {
        if (time - item.time > 120) {
          bot.say(msg)
        }
        item.time = time;
        return true
      } else {
        return false
      }
    }).length == 0) {
      this.cache.push({
        time,
        msg
      })
      bot.say(msg)
      console.log(this.cache)
    }
  }
}

bot.onMessage(str => {
  const data = JSON.parse(str)
  if (data.type == 'update') {
    if (data.name != bot.name && data.x > 1966600 && data.x < 1966800 && data.y > 1966600 && data.y < 1966800) {
      message.send(`@${data.name} 欢迎来到光之国，已帮您变身奥特曼`)
    }
  }
})
setTimeout(() => {
  bot.x = 1966717
  bot.y = 1966717
  bot.update()
}, 1000)
setInterval(() => {
  bot.x = bot.x + bot.random(-30, 30)
  bot.y = bot.y + bot.random(-30, 30)
  bot.update()
}, Math.random() * 500 + 10000)
