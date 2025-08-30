const axios = require('axios');

async function fetchChapterContent(fileUrl) {
  try {
    const response = await axios.get(fileUrl);
    return response.data || ''; // Assuming content is inside 'content'
  } catch (error) {
    console.error('Error fetching chapter content:', error);
    return '';
  }
}

module.exports = fetchChapterContent;
