module.exports = {
    name: "ping",
      category: "info",
    description: "Get the bot's ping.",
        timeout: 2500,
       usage:"o?ping",
    run: async (client, message, args) => {
       message.channel.send('Ping?').then(m => m.edit(`API: ${m.createdTimestamp - message.createdTimestamp}ms. Web Socket: ${Math.round(client.ws.ping)}ms.`))

    }
}
