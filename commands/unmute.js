const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const muteR = message.guild.roles.find(c => c.name.toLowerCase() === "muted")

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` \`\`\`js
Error 1004: Insufficient Permission\`\`\` `)

    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(` \`\`\`js
Error 1005: The client does not have permission to do this. \nPlease contact the owner of the server to grant me permission. \nPermission needed: 'ADMINISTRATOR'\`\`\` `)

    if (!message.mentions.members.first()) return message.channel.send(` \`\`\`js
Error 404: Member was not found inside of the guild or was not mentioned.\`\`\` `)

    if (message.mentions.members.first().roles.has(muteR)) return message.channel.send(` \`\`\`js
Error 101: This member is not muted.\`\`\` `)

    if (message.member.hasPermission("ADMINISTRATOR")) {
      message.mentions.members.first().removeRole(muteR)
      message.mentions.members.first().addRole(message.guild.roles.find(x => x.name.toLowerCase() === "member"))
      message.channel.send(`Successfully unmuted **${message.mentions.members.first().displayName}**`)
    }

}

module.exports.help = {
    name: "unmute",
    dName: 'unmute',
    desc: "Unmutes the targeted user if they are muted",
    usage: ",unmute @user",
    group: "mod"
}
