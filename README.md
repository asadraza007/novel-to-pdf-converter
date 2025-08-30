# Novel Scraper

This project helps you download novels in PDF format from the [novelhubapp.com](https://novelhubapp.com/) website using the novel's ID.

## Features
- Download any novel as a PDF by providing its novel ID from novelhubapp.com
- Simple and easy-to-use script
- Outputs PDF files to the `output/` directory

## Usage
1. Clone or download this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the script with the desired novel ID:
   ```bash
   node index.js
   ```
   To download a different novel, update the novel list and titles in the `novels` array inside `index.js`.

4. The downloaded PDF will be saved in the `output/` folder.

## Project Structure
- `index.js` - Main script to run the downloader
- `utils/` - Helper functions for fetching chapter lists and content
- `output/` - Folder where downloaded PDFs are saved

## Requirements
- Node.js (v14 or higher recommended)
- Internet connection

## Disclaimer
This project is for educational purposes only. Please respect the terms of service of novelhubapp.com and do not use this tool for any illegal activities.
