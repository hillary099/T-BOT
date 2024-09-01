const axios = require('axios');

module.exports = {
    config: {
        name: "calc",
        author: "keithkeizzah",
        description: "Send a link of the replied file",
        category: "Maths",
        usage: ".ccgen bin_numbet",
        usePrefix: true
    },
    onStart: async function ({ bot, chatId, args }) {
        const gift = args.join(' ');
        if (!gift) {
            bot.sendMessage(chatId, "Please provide your query. Example Usage: .calc <500+500>");
            return;
        }

        try {
            const apiUrl = `https://api.maher-zubair.xyz/ai/mathssolve?q=${encodeURIComponent(gift)}`;
            const response = await axios.get(apiUrl);
            const giftech = response.data.result;

            bot.sendMessage(chatId, `𝐊𝐄𝐈𝐓𝐇-𝐌𝐃 \n\nHere is the answer:\n${giftech}`);
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, "An error occurred while processing the command.");
        }
    }
};
