const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const muteR = message.guild.roles.find(c => c.name.toLowerCase() === "muted")
    if (!muteR) {
      message.guild.createRole({
        "name": "muted"
      }).then(role => {
        message.guild.channels.forEach(channel => {
          channel.overwritePermissions(role, {
            "SEND_MESSAGES": false,
            "READ_MESSAGES": false
          })
        })
        message.channel.send(`Successfully muted ${message.mentions.members.first().displayName}`)
        message.mentions.members.first().addRole(role.id)
        message.member.send("There was no role called 'muted'. So I created one.")
      })
    }else{
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have the authorization to do this.")

    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`The client does not have permission to do this. \nPlease contact the owner of the server to grant me permission. \nPermission needed: 'ADMINISTRATOR'`)

    if (!message.mentions.members.first()) return message.channel.send("The mentioned member was not found.")

    if (message.mentions.members.first().roles.has(muteR.id)) return message.channel.send("This user is already muted.")

    if (message.member.hasPermission("ADMINISTRATOR")) {
      message.mentions.members.first().addRole(muteR.id)
      message.mentions.members.first().removeRole(message.guild.roles.find(x => x.name.toLowerCase() === "member"))
      message.channel.send(`Successfully muted **${message.mentions.members.first().displayName}**`)
     }
     
    }
}

module.exports.help = {
    name: "mute",
    dName: "mute",
    desc: "Mutes the mentioned member",
    usage: ",mute @user",
    group: "mod"
}
