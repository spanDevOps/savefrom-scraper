// Import axios for HTTP requests
const axios = require("axios");
// Import fs to write to a file
const fs = require("fs");

// Function to fetch HTML from a given URL and save it to a file
async function fetchSaveFromPage(url) {
  try {
    // Send GET request to fetch the HTML content of the page
    const response = await axios.get(url);

    // Save the HTML content to a file named 'savefrompage.html'
    fs.writeFileSync("savefrompage.html", response.data); // This saves the content into a file
    console.log("HTML content saved to savefrompage.html");
  } catch (error) {
    console.error("Error fetching SaveFrom page:", error);
  }
}

// Replace this URL with the actual SaveFrom URL you want to fetch
const saveFromURL =
  "https://savefrom-scraper.vercel.app/api/scrape?url=https://soundcloud.com/dianaji/dard-e-disco-om-shanti-om";

fetchSaveFromPage(saveFromURL);
