const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Fucktape!")
    .setImage("https://cdn.discordapp.com/attachments/578646459801403402/595705034818453524/Screenshot_20190701-022010.jpg")
    .setFooter("Occult Moderation", client.user.displayAvatarURL)
    .setTimestamp()
    message.channel.send(embed)

}

module.exports.help = {
  "name": "fucktape",
  "dName": "fucktape",
  "desc": "Waifu's special command uwu",
  "usage": ",fucktape",
  "group": "fun"
}
