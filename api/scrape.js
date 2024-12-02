const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    // Get SoundCloud URL from the query parameter
    const soundcloudUrl = req.query.url;

    if (!soundcloudUrl) {
        return res.status(400).json({ error: 'SoundCloud URL is required' });
    }

    try {
        // Construct the SaveFrom URL by appending the SoundCloud URL
        const savefromUrl = `https://en.savefrom.net/1-1.php?url=${soundcloudUrl}`;

        // Send GET request to SaveFrom
        const response = await axios.get(savefromUrl);

        // Load the page content using Cheerio
        const $ = cheerio.load(response.data);

        // Find the download link (you can inspect the HTML structure of SaveFrom to find the correct element)
        const downloadLink = $('a.button').attr('href');

        if (downloadLink) {
            return res.status(200).json({ downloadUrl: downloadLink });
        } else {
            return res.status(404).json({ error: 'Download link not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching the SaveFrom page' });
    }
};
