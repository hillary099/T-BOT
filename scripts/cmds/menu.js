const fs = require('fs');
const path = require("path");

module.exports = {
  config: {
    name: "menu",
    description: "Show available commands",
    usage: ".menu [command_name]",
    author: "keithkeizzah",
    category: "utility",
    role: 0x0,
    cooldown: 0x0,
    usePrefix: true
  },
  onStart: async function ({ msg, bot, match }) {
    try {
      // Define the directory where commands are stored
      const commandDir = path.join(__dirname, '.');
      
      // Read all .js files from the command directory
      const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith(".js"));
      
      // Initialize objects to store command categories and details
      const categories = {};
      const commandDetails = {};
      const categoryCommands = {};

      // Iterate through command files and organize them by category
      for (const file of commandFiles) {
        const command = require(path.join(commandDir, file));
        const category = command.config.category || "uncategorized";
        
        // Group commands by category
        if (!categories[category]) {
          categories[category] = [];
          categoryCommands[category] = [];
        }
        categories[category].push(command.config.name);
        commandDetails[command.config.name] = command.config;
        categoryCommands[category].push(command.config.name);
      }

      // If a specific command name is provided, show its details
      if (match && match[1] && match[1].trim()) {
        const commandName = match[1].trim().toLowerCase();
        const commandConfig = commandDetails[commandName];

        if (commandConfig) {
          let commandInfo = `─── NAME ────⭓\n\n» ${commandConfig.name}\n\n` +
                            `─── INFO ────⭓\n\n` +
                            `» Description: ${commandConfig.description || "No description available"}\n` +
                            `» Role: ${commandConfig.role}\n` +
                            `» Author: ${commandConfig.author || "Unknown"}\n` +
                            `» Cooldown: ${commandConfig.cooldown}\n` +
                            `» Use Prefix: ${commandConfig.usePrefix}\n\n` +
                            `─── USAGE ────⭓\n\n` +
                            `» ${commandConfig.usage || '/' + commandConfig.name}\n\n` +
                            `───────⭔`;

          await bot.sendMessage(msg.chat.id, commandInfo);
        } else {
          await bot.sendMessage(msg.chat.id, `Command '${commandName}' not found.`);
        }
      } else {
        // If no specific command is requested, show the list of all categories and commands
        let menuMessage = `╭══ **〘〘 𝗞𝗘𝗜𝗧𝗛-𝗧-𝗕𝗢𝗧 〙〙** ═⊷\n` +
                          `┃❍ ᴜsᴇʀ: •••\n` +
                          `┃❍ **ᴏᴡɴᴇʀ:** keithkeizzah\n` +
                          `┃❍ **ᴄᴏᴍᴍᴀɴᴅs:** 158\n` +
                          `┃❍ **ᴠᴇʀsɪᴏɴ:** 1.0.0\n` +
                          `╰════════════════⊷\n\n` +
                          `**𝙆𝙚𝙞𝙩𝙝-𝙏-𝘽𝙤𝙩 𝙘𝙤𝙢𝙢𝙖𝙣𝙙𝙨:**\n\n`;

        // List all command categories and commands
        for (const category in categoryCommands) {
          menuMessage += `╭─── **『 ${category} 』** \n`;
          menuMessage += `✧ .${categoryCommands[category].join("\n✧ .")}\n`;
          menuMessage += `╰─────────────────◊\n\n`;
        }

        await bot.sendMessage(msg.chat.id, menuMessage, { 'parse_mode': "markdown" });
      }
    } catch (error) {
      console.error("Error generating menu message:", error);
      await bot.sendMessage(msg.chat.id, "An error occurred while generating the menu message.");
    }
  }
};
