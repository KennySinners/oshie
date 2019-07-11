/*
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let kickEmbed = new Discord.RichEmbed()
  .setColor(message.member.highestRole.hexColor)
  .addField("Member who was kicked", message.mentions.members.first().displayName)
  .addField("Member who kicked " + message.mentions.members.first().displayName, message.member.displayName)
  .addField("Server the member was kicked from", message.guild.name)
  .setFooter("Occult Moderation")
  .setTimestamp()

  if(!message.mentions.members.first()){
    return message.channel.send("Error: Missing argument. \nArgument needed: **@user**")
  }else

  if(message.mentions.members.first().id === message.member.id){
    return message.channel.send(`Silly you! You can't kick yourself, dummy!`)
  }else

  if(!message.member.hasPermission("ADMINISTRATOR_MEMBERS")){
    return message.channel.send("Insufficient Permission. \nPermission needed to run this command: **ADMINISTRATOR_MEMBERS**")
  }else

  if(!message.guild.me.hasPermission("KICK_MEMBERS")){
    return message.channel.send("Client Error: Insufficient Permission. \nPermission needed: **KICK_MEMBERS**")
  }else

  if(message.mentions.members.first().highestRole > message.member.highestRole || message.mentions.members.first().highestRole === message.member.highestRole){
    return message.channel.send("You cannot kick someone that has the same or higher role than you.")
  }else

  if(message.mentions.members.first().highestRole > message.guild.me.highestRole  || message.mentions.members.first().highestRole === message.guild.me.highestRole){
    return message.channel.send("Client Error: Cannot kick someone that has the same or higher role than " + message.guild.me.displayName)
  }else

  if(!message.content.split(" ").slice(2).join(" ")){
    kickEmbed.addField("Reason", "No supplied reason")
  }else{
    kickEmbed.addField("Reason", message.content.split(" ").slice(2).join(" "))
  }

  if(message.member.hasPermission("KICK_MEMBERS") && message.guild.me.hasPermission("KICK_MEMBERS") && message.mentions.members.first()){
    let logChannel = message.guild.channels.find(x => x.name === "occult-logs")

    message.mentions.members.first().kick().then(() => {
      if(logChannel){
        logChannel.send(kickEmbed)
      }else{
        message.guild.createChannel("occult-logs" , {
          type: "text",
          permissions: [{
            id: message.guild.id,
            deny: ["SEND_MESSAGES", "READ_MESSAGES"],
          }]
        }).then(chn => {
          chn.send(kickEmbed)
        })
      }
      message.channel.send(`Successfully kicked ${message.mentions.members.first().displayName} | Tag: ${message.mentions.members.first().user.tag}`)
    })
  }

}

module.exports.help = {
  "name": "kick",
  "dName": "kick",
  "desc": "kicks the mentioned user",
  "usage": ",kick @user [supplied_reason]",
  "group": "admin"
}
*/