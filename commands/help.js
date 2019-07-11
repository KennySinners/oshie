const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    let help = new Discord.RichEmbed()
        .setTitle(`${message.guild.members.find(member => member.id === client.user.id).nickname || client.user.username}'s help menu`)
        .addField('🛠 Administration 🛠', admin)
        .addField('🛡 Moderation 🛡', mod)
        .addField('❤ Other ❤', other)
        .addField("🤡 Fun 🤡", fun)
        .addField('⚙ Utility ⚙', util)
        .addField('© Developer ©', dev)
        .setColor('RANDOM');

    return message.channel.send(help)

}

module.exports.help = {
    "name": "help",
    "dName": "help",
    "desc": "Displays the help embed",
    "usage": ",help",
    "group": "other"
}
