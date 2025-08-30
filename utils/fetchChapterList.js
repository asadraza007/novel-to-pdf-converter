const axios = require('axios');

async function fetchChapterList(novelId) {
  try {
    const url = `https://novelhubapp.com/wefeed-h5novel-bff/web/novel/chapter-list?novelId=${novelId}&order=ASC`;
    const response = await axios.get(url);
    return response.data.data; // Assuming data is in "data" field
  } catch (error) {
    console.error('Error fetching chapter list:', error);
    return [];
  }
}

module.exports = fetchChapterList;
