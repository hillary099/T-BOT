const fs = require('fs');
const path = require("path");
module.exports = {
  'config': {
    'name': "menu",
    'description': "Show available commands",
    'usage': ".menu [command_name]",
    'author': "keithkeizzah",
    'category': "utility",
    'role': 0x0,
    'cooldown': 0x0,
    'usePrefix': true
  },
  'onStart': async function ({
    msg: _0x1fd5ee,
    bot: _0x5f2065,
    match: _0x26a3b2
  }) {
    try {
      const _0x7cf73e = gift.join(__dirname, '.');
      const _0x1e2936 = giftek.readdirSync(_0x7cf73e).filter(_0x3f1cd9 => _0x3f1cd9.endsWith(".js"));
      const _0x46b712 = {};
      const _0x3af0d9 = {};
      const _0x7cc488 = {};
      for (const _0x517346 of _0x1e2936) {
        const _0x202c02 = require(gift.join(_0x7cf73e, _0x517346));
        const _0x6ea7a2 = _0x202c02.config.category || "categorized";
        if (!_0x46b712[_0x6ea7a2]) {
          _0x46b712[_0x6ea7a2] = [];
          _0x7cc488[_0x6ea7a2] = [];
        }
        _0x46b712[_0x6ea7a2].push(_0x202c02.config.name);
        _0x3af0d9[_0x202c02.config.name] = _0x202c02.config;
        _0x7cc488[_0x6ea7a2].push(_0x202c02.config.name);
      }
      if (_0x26a3b2 && _0x26a3b2[1] && _0x26a3b2[1].trim()) {
        const _0x285bb1 = _0x26a3b2[1].trim().toLowerCase();
        const _0x1a00c7 = _0x3af0d9[_0x285bb1];
        if (_0x1a00c7) {
          let _0xd023a6 = "─── NAME ────⭓\n\n» " + _0x1a00c7.name + "\n\n─── INFO ────⭓\n\n» Description: " + (_0x1a00c7.description || "Do not have") + "\n» Role: " + _0x1a00c7.role + "\n» Author: " + (_0x1a00c7.author || "Unknown") + "\n» Cooldown: " + _0x1a00c7.cooldown + "\n» Use Prefix: " + _0x1a00c7.usePrefix + "\n\n─── USAGE ────⭓\n\n» " + (_0x1a00c7.usage || '/' + _0x1a00c7.name) + "\n\n───────⭔";
          await _0x5f2065.sendMessage(_0x1fd5ee.chat.id, '' + _0xd023a6);
        } else {
          await _0x5f2065.sendMessage(_0x1fd5ee.chat.id, "Command '" + _0x285bb1 + "' not found.");
        }
      } else {
        let _0x5b09b8 = "╭══ **〘〘 𝗞𝗘𝗜𝗧𝗛-𝗧-𝗕𝗢𝗧 〙〙** ═⊷ \n┃❍ ᴜsᴇʀ: •••\n┃❍ **ᴏᴡɴᴇʀ:** keithkeizzah \n┃❍ **ᴄᴏᴍᴍᴀɴᴅs:** 158\n┃❍ **ᴠᴇʀsɪᴏɴ:** 1.0.0 \n╰════════════════⊷ \n\n **𝙆𝙚𝙞𝙩𝙝-𝙏-𝘽𝙤𝙩 𝙘𝙤𝙢𝙢𝙖𝙣𝙙𝙨:** \n\n";
        for (const _0x1a3cf4 in _0x7cc488) {
          _0x5b09b8 += "╭─── **『 " + _0x1a3cf4 + " 』** \n";
          _0x5b09b8 += "✧ ." + _0x7cc488[_0x1a3cf4].join("\n✧ .") + "\n";
          _0x5b09b8 += "╰─────────────────◊\n\n";
        }
        await _0x5f2065.sendMessage(_0x1fd5ee.chat.id, _0x5b09b8, {
          'parse_mode': "markdown"
        });
      }
    } catch (_0xf7a3a) {
      console.error("Error generating menu message:", _0xf7a3a);
      await _0x5f2065.sendMessage(_0x1fd5ee.chat.id, "An error occurred while generating the menu message.");
    }
  }
};
