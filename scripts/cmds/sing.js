const fs = require("fs-extra");
const axios = require("axios");
const yts = require("yt-search");
const path = require("path");

module.exports = {
  config: {
    name: "play",
    author: "keithkeizzah",
    description: "Search and download music from YouTube",
    category: "song",
    usage: "song [title]",
    usePrefix: true,
    role: 0
  },
  
  onStart: async ({ bot, chatId, args }) => {
    const search = args.join(" ");

    try {
      if (!search) {
        return bot.sendMessage(chatId, `Please provide a search query. Usage: /sing song name`);
      }

      bot.sendMessage(chatId, `🔍 Searching for song: ${search}`);

      const searchResults = await yts(search);
      if (!searchResults.videos.length) {
        return bot.sendMessage(chatId, "No music found for your query.");
      }

      const music = searchResults.videos[0];
      const musicUrl = music.url;

      // Use the provided API to fetch the MP3 download URL
      const apiUrl = `https://api.giftedtech.my.id/api/download/ytmp3?url=${encodeURIComponent(musicUrl)}&apikey=gifted`;

      // Fetch the download link using the API
      const response = await axios.get(apiUrl, { timeout: 10000 });  // Added timeout of 10 seconds

      console.log(response.data);  // Log the full response to debug the structure

      if (response.data && response.data.status === 'success') {
        const downloadUrl = response.data.result.url;  // Assuming the response contains the download URL in `result.url`

        // Ensure the cache folder exists
        const cachePath = path.join(__dirname, "cache");
        if (!fs.existsSync(cachePath)) {
          fs.mkdirSync(cachePath);
        }

        // Download the MP3 file
        const fileName = `${music.title}.mp3`.replace(/[^a-z0-9]/gi, '_').toLowerCase();  // Replace special characters for safe filenames
        const filePath = path.join(cachePath, fileName);

        // Fetch the audio file and save it locally
        const audioResponse = await axios.get(downloadUrl, { responseType: 'stream' });

        const writer = fs.createWriteStream(filePath);
        audioResponse.data.pipe(writer);

        writer.on('finish', () => {
          const stats = fs.statSync(filePath);
          if (stats.size > 226214400) {  // 226MB size limit
            fs.unlinkSync(filePath);
            return bot.sendMessage(chatId, '❌ The file could not be sent because it is larger than 205MB.');
          }

          bot.sendAudio(chatId, fs.createReadStream(filePath), { caption: `${music.title}` });
        });

        writer.on('error', (err) => {
          console.error('[ERROR]', err);
          bot.sendMessage(chatId, 'An error occurred while downloading the audio.');
        });
        
      } else {
        return bot.sendMessage(chatId, '❌ Failed to fetch the audio from the API. Please try again later.');
      }
    } catch (error) {
      console.error('[ERROR]', error);

      // Check for specific error types
      if (error.response) {
        // API error response
        return bot.sendMessage(chatId, `API error: ${error.response.status} ${error.response.statusText}`);
      } else if (error.request) {
        // No response from API
        return bot.sendMessage(chatId, 'No response received from the API. Please check your internet connection or try again later.');
      } else {
        // General error
        return bot.sendMessage(chatId, 'An error occurred while processing the command. Please try again later.');
      }
    }
  }
};
