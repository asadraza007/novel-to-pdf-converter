const fs = require("fs-extra");
const PDFDocument = require("pdfkit");
const fetchChapterList = require("./utils/fetchChapterList");
const fetchChapterContent = require("./utils/fetchChapterContent");


// https://novelhubapp.com/ all novels from this website
const novels = [
    {
        title: "Super Alchemy Kind Reborn In City",
        novelId:"1531798660726538352"
    },

];

const start = async () => {
	for (let novel of novels) {
        try {
            const novelId = novel.novelId; // Replace with the correct Novel ID
            const chapters = await fetchChapterList(novelId);

            if (chapters.chapterList.length === 0) {
                console.log("No chapters.chapterList found!");
                return;
            }

            const totalChapters = chapters.chapterList.length;
            let volumes = [];
            if (totalChapters > 100) {
                // Split into volumes of 50 chapters each, but if remaining chapters < 100, add all to last volume
                let i = 0;
                while (i < totalChapters) {
                    // If remaining chapters are less than 100, add all to last volume
                    if (totalChapters - i < 100) {
                        volumes.push(chapters.chapterList.slice(i));
                        break;
                    } else {
                        volumes.push(chapters.chapterList.slice(i, i + 50));
                        i += 50;
                    }
                }
            } else {
                // Keep all chapters in one volume
                volumes = [chapters.chapterList];
            }

            for (let v = 0; v < volumes.length; v++) {
                const volumeChapters = volumes[v];
                const volumeNumber = volumes.length > 1 ? `_Volume_${v + 1}` : '';
                const outputDir = `./output/${novel.title}`;
                fs.ensureDirSync(outputDir);
                const outputPath = `${outputDir}/${volumeNumber}.pdf`;
                const doc = new PDFDocument();
                doc.pipe(fs.createWriteStream(outputPath));

                console.group(`${novel.title}${volumeNumber}`);
                    // Add title and volume to the first page, vertically centered
                    const pageHeight = doc.page.height;
                    const titleBlockHeight = volumeNumber ? 28 + 20 + 20 : 28 + 20; // font sizes + spacing
                    const y = (pageHeight - titleBlockHeight) / 2;
                    doc.fontSize(28).text(novel.title, 0, y, { align: 'center' });
                    if (volumeNumber) {
                        doc.moveDown();
                        doc.fontSize(20).text(`Volume ${v + 1}`, { align: 'center' });
                    }
                    doc.addPage();

                for (const chapter of volumeChapters) {
                    const { chapterName, fileUrl } = chapter;
                    // Fetch the chapter content
                    const content = await fetchChapterContent(fileUrl);
                    // Add a new page in the PDF for each chapter
                    doc.addPage();
                    doc.fontSize(16).text(chapterName, { underline: true });
                    doc.moveDown();
                    doc.fontSize(14).text(content, {
                        lineGap: 6 // Adds vertical gap between lines
                    });
                    console.log(`Added: ${chapterName}`);
                }
                console.groupEnd(`${novel.title}${volumeNumber}`);
                doc.end();
                console.log(`✅ PDF generated at ${outputPath}`);
            }
        } catch {
            doc.end();
        }
	}
};

start();
