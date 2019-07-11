/*
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let banEmbed = new Discord.RichEmbed()
  .setColor(message.member.highestRole.hexColor)
  .addField("Member who was banned", message.mentions.members.first().displayName)
  .addField("Member who banned " + message.mentions.members.first().displayName, message.member.displayName)
  .addField("Server the member was banned from", message.guild.name)
  .setFooter("Occult Moderation")
  .setTimestamp()

  if(!message.mentions.members.first()){
    return message.channel.send("Error: Missing argument. \nArgument needed: **@user**")
  }else

  if(message.mentions.members.first().id === message.member.id){
    return message.channel.send(`Silly you! You can't ban yourself, dummy!`)
  }else

  if(!message.member.hasPermission("ADMINISTRATOR")){
    return message.channel.send("Insufficient Permission. \nPermission needed to run this command: **ADMINISTRATOR**")
  }else

  if(!message.guild.me.hasPermission("BAN_MEMBERS")){
    return message.channel.send("Client Error: Insufficient Permission. \nPermission needed: **BAN_MEMBERS**")
  }else

  if(message.mentions.members.first().highestRole >= message.member.highestRole){
    return message.channel.send("You cannot ban someone that has the same or higher role than you.")
  }else

  if(message.mentions.members.first().highestRole >= message.guild.me.highestRole){
    return message.channel.send("Client Error: Cannot ban someone that has the same or higher role than " + message.guild.me.displayName)
  }else

  if(!message.content.split(" ").slice(2).join(" ")){
    banEmbed.addField("Reason", "No supplied reason")
  }else{
    banEmbed.addField("Reason", message.content.split(" ").slice(2).join(" "))
  }

  if(message.member.hasPermission("BAN_MEMBERS") && message.guild.me.hasPermission("BAN_MEMBERS") && message.mentions.members.first()){
    let logChannel = message.guild.channels.find(x => x.name === "occult-logs")

    message.mentions.members.first().ban().then(() => {
      if(logChannel){
        logChannel.send(banEmbed)
      }else{
        message.guild.createChannel("occult-logs" , {
          type: "text",
          permissions: [{
            id: message.guild.id,
            deny: ["SEND_MESSAGES", "READ_MESSAGES"],
          }]
        }).then(chn => {
          chn.send(banEmbed)
        })
      }
      message.channel.send(`Successfully banned ${message.mentions.members.first().displayName} | Tag: ${message.mentions.members.first().user.tag}`)
    })
  }

}

module.exports.help = {
  "name": "ban",
  "dName": "ban",
  "desc": "Bans the mentioned user",
  "usage": ",ban @user [supplied_reason]",
  "group": "admin"
}
*/
