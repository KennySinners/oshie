const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {


    if (!message.member.hasPermission("BAN_MEMBERS")){
         message.channel.send(` \`\`\`js
Error 1004: Insufficient permission `)
    }else

    if (!message.guild.me.hasPermission("BAN_MEMBERS")){
         message.channel.send(` \`\`\`js
Error 1005: The client does not have permission to do this. \nPlease contact the owner of the server to grant me permission. \nPermission needed: 'BAN MEMBERS'\`\`\` `)
    }else

    if(!message.content.split(" ").slice(1).join(" ")){
     message.channel.send("No member was mentioned.")
    }else

    if(message.guild.member(client.users.get(args[0]))){
        return message.channel.send("This user is in the guild, therefore isn't banned.")
    }else

    if (!client.users.get(message.content.split(" ")[1])){
         message.channel.send(` \`\`\`js
Error 404: User ID was not found or was not given inside of the message.\`\`\` `)
    }else

    if (message.member.hasPermission("BAN_MEMBERS")) {

        const unbanEmbed = new Discord.RichEmbed()
        .setColor("#1be8ff")
        .setTitle(message.member.displayName, message.author.displayAvatarURL)
        .setDescription(`**${client.users.get(message.content.split(" ")[1]).username}** was successfully unbanned from \`${message.guild.name}\` `)
        .addField(`Member that unbanned ${client.users.get(message.content.split(" ")[1]).username}`, `**${message.member.displayName}**`)
        .setFooter(`The Innovation-X Development Team`, client.user.displayAvatarURL)
        .setTimestamp()

        const Log = message.guild.channels.find(c => c.name.includes("kicklog") || c.name.includes("kick-log") || c.name.includes("ban-log") || c.name.includes("ban-logs") || c.name.includes("kick-logs") || c.name.includes("kick-logs") || c.name.includes("log"))
        message.guild.unban(client.users.get(message.content.split(" ")[1]))
        Log.send(unbanEmbed)
    }

}

module.exports.help = {
    name: "unban",
    dName: 'unban',
    desc: "Unbans the mentioned user if they are banned",
    usage: ",unban @user",
    group: "admin"
}
