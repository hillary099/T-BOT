module.exports = {
  'config': {
    'name': "repo",
    'author': "keithkeizzah",
    'description': "Display bot repo",
    'category': "system",
    'usage': ".feature",
    'usePrefix': true
  },
  'onStart': async function ({
    bot: _0x3ab608,
    chatId: _0x36d3b4
  }) {
    try {
      _0x3ab608.sendMessage(_0x36d3b4, "\n𝗞𝗲𝗶𝘁𝗵-𝗠𝗱 𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺 𝗕𝗼𝘁:\n \n𝗥𝗲𝗽𝗼 𝗟𝗶𝗻𝗸: https://github.com/keithkeizzah/T-BOT\nKindly fork and Star Repo for Courage...\n Happy Deployment!!!\n \n𝗠𝗮𝗱𝗲 𝗜𝗻 𝗞𝗲𝗻𝘆𝗮 🇰🇪𝗕𝘆 𝗞𝗲𝗶𝘁𝗵𝗸𝗲𝗶𝘇𝘇𝗮𝗵\n ");
    } catch (_0x2d2b86) {
      console.error("[ERROR]", _0x2d2b86);
      _0x3ab608.sendMessage(_0x36d3b4, "An error occurred while fetching the features.");
    }
  }
};
