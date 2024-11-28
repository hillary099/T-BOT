const { downloadAudio } = require('../../lib/scrap');  // Import your download function
const fs = require("fs-extra");
const yts = require("yt-search");
const path = require("path");
const ytdl = require('ytdl-core');  // Ensure ytdl-core is installed
const axios = require('axios');

module.exports = {
  config: {
    name: "play",
    author: "keithkeizzah",
    description: "Search and download music from YouTube",
    category: "play",
    usage: "Download [title]",
    usePrefix: true,
    role: 0
  },
  onStart: async ({ bot, chatId, args }) => {
    const search = args.join(" ");

    try {
      if (!search) {
        return bot.sendMessage(chatId, `Please provide a search query. Usage: /play song name`);
      }

      bot.sendMessage(chatId, `🔍 Searching for song: ${search}`);

      const searchResults = await yts(search);
      if (!searchResults.videos.length) {
        return bot.sendMessage(chatId, "No music found for your query.");
      }

      const music = searchResults.videos[0];
      const musicUrl = music.url;

      // Call downloadAudio from scrap.js
      const audioDetails = await downloadAudio(musicUrl);
      if (!audioDetails || !audioDetails.status) {
        return bot.sendMessage(chatId, "Sorry, an error occurred while fetching the audio.");
      }

      const downloadLink = audioDetails.downloadLink;

      // Download the audio
      const filePath = path.join(__dirname, "cache", `${audioDetails.title}.mp3`);

      // Start downloading the audio file
      const writer = fs.createWriteStream(filePath);
      const audioStream = axios({
        method: 'get',
        url: downloadLink,
        responseType: 'stream',
      }).then(response => {
        response.data.pipe(writer);
      });

      writer.on('finish', () => {
        // Check file size before sending
        const stats = fs.statSync(filePath);
        if (stats.size > 226214400) {
          fs.unlinkSync(filePath);  // Clean up if file is too large
          return bot.sendMessage(chatId, '❌ The file could not be sent because it is larger than 205MB.');
        }

        bot.sendAudio(chatId, fs.createReadStream(filePath), { caption: `${audioDetails.title}` })
          .then(() => fs.unlinkSync(filePath))  // Clean up the file after sending
          .catch((err) => {
            console.error("Error sending audio:", err);
            bot.sendMessage(chatId, "An error occurred while sending the audio.");
          });
      });

      writer.on('error', (err) => {
        console.error("Error downloading audio:", err);
        bot.sendMessage(chatId, "An error occurred while downloading the audio.");
      });

    } catch (error) {
      console.error('[ERROR]', error);
      bot.sendMessage(chatId, 'An error occurred while processing the command.');
    }
  }
};
