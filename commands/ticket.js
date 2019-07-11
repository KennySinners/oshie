const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = async (client, message, args) => {

    let infoEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, client.user.displayAvatarURL)
        .setThumbnail(message.author.displayAvatarURL)
        .setFooter("Occult Moderation", client.user.displayAvatarURL)
        .setTimestamp()

    let tickets = [];
    let array_messages = [];
    let bot_array = [];

    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter);
    const kollector = message.channel.createMessageCollector(filter);

    if (!message.guild.channels.find(x => x.name.toLowerCase() === "occult-tickets")) {
        return message.channel.send(`:x: Cannot create a ticket since I cannot find my ticket category. \nPlease contact an admin to run **?setup**`)
    }

    if (message.guild.channels.find(x => x.name.includes(message.author.id.slice(14)))) {
        return message.channel.send("You already have a ticket open!" + "\nTicket ID: " + message.guild.channels.find(x => x.name.includes(message.author.id.slice(14))).id)
    }

    message.channel.send("Can you please describe the title of your issue? 20-100 characters only.").then(msg => {
        bot_array.push(msg)
        collector.on("collect", m => {
            array_messages.push(m)


            if (m.content.toLowerCase() === "?cancel") {
                array_messages.forEach(m => m.delete())
                bot_array.forEach(m => m.delete())
                return collector.stop();
            }

            if (m.content.length < 20) {
                return message.channel.send("Please describe your issue within the character length limit. (20-100 chars)" + " Current length: " + m.content.length).then(mm => {
                    bot_array.push(mm)
                })
            } else

                if (m.content.length > 100) {
                    return message.channel.send("Please describe your issue within the character length limit. (20-100 chars)" + " Current length: " + m.content.length).then(md => {
                        bot_array.push(md)
                    })
                }

            infoEmbed.addField("Title", m.content)
            collector.stop();
            message.channel.send("Can you give a detailed description of your issue? 50-300 characters only.").then(mesg => {
                bot_array.push(mesg)
                kollector.on("collect", ms => {
                    array_messages.push(ms)

                    if (ms.content.toLowerCase() === "?cancel") {
                        array_messages.forEach(m => m.delete())
                        bot_array.forEach(m => m.delete())
                        return collector.stop();
                    }

                    if (ms.content.length < 50) {
                        return message.channel.send("Please describe your issue within the character length limit. (50-300 chars)" + " Current length: " + m.content.length).then(med => {
                            bot_array.push(med)
                        })
                    } else

                        if (ms.content.length > 300) {
                            return message.channel.send("Please describe your issue within the character length limit. (50-300 chars)" + " Current length: " + m.content.length).then(dem => {
                                bot_array.push(dem)
                            })
                        }

                    infoEmbed.addField("Description", ms.content)
                    message.guild.createChannel(message.author.id.slice(14) + " " + message.author.username, {
                        type: "text",
                        parent: message.guild.channels.find(x => x.name === "occult-tickets").id,
                        permissions: [{
                            id: message.guild.id,
                            deny: ["READ_MESSAGES"],
                            allow: []
                        }],
                    }).then(chn => {
                        chn.send(infoEmbed)
                        kollector.stop();
                        chn.overwritePermissions(message.author.id, {
                            "SEND_MESSAGES": true,
                            "READ_MESSAGES": true
                        }).then(() => {
                            message.channel.send(`Successfully created a ticket!`).then(() => {
                                array_messages.forEach(m => m.delete());
                                bot_array.forEach(m => m.delete());
                            })
                        })
                    })
                })
            })
        })
    })

}

module.exports.help = {
    name: "ticket",
    dName: "ticket",
    desc: "Creates a ticket",
    usage: ",ticket",
    group: "util"
}