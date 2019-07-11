const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    message.channel.fetchMessages().then(msgs => {
        message.channel.bulkDelete(msgs.filter(m => m.author.bot))
    })

}

module.exports.help = {
  "name": "bc",
  "dName": "bc",
  "desc": "Clears all bot messages",
  "usage": ",bc",
  "group": "mod"
}
