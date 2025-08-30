const fs = require("fs-extra");
const PDFDocument = require("pdfkit");
const fetchChapterList = require("./utils/fetchChapterList");
const fetchChapterContent = require("./utils/fetchChapterContent");


// https://novelhubapp.com/ all novels from this website
const novels = [
    {
        title: "No 1 Supreme Warrior",
        novelId:"667648461928023144",
    },
	{
		title: "Richest Man: Getting 7 Billion Red Pockets To Start With",
		novelId: "4961576560525984880",
    },
    {
        title: "The Mafia King's First Love",
        novelId:"5808619702721675680"
    },
    {
        title: "Best Soldier Son-in-law",
        novelId:"6826596410084704368",
    },
    {
        title: "Super Alchemy Kind Reborn In City",
        novelId:"1531798660726538352"
    },
    {
        title: "Urban Invincible Divine Doctor",
        novelId:"6188563968699105800"
    }
];

const start = async () => {
	for (let novel of novels) {
        const doc = new PDFDocument();
        try {
            const novelId = novel.novelId; // Replace with the correct Novel ID
            const outputPath = `./output/${novel.title}.pdf`;
			doc.pipe(fs.createWriteStream(outputPath));

			const chapters = await fetchChapterList(novelId);

			if (chapters.chapterList.length === 0) {
				console.log("No chapters.chapterList found!");
				return;
			}

            console.group(novel.title);
			for (const chapter of chapters.chapterList) {
				const { chapterName, fileUrl } = chapter;

                // Fetch the chapter content
				const content = await fetchChapterContent(fileUrl);

				// Add a new page in the PDF for each chapter
				doc.addPage();
				doc.fontSize(16).text(chapterName, { underline: true });
				doc.moveDown();
				doc.fontSize(12).text(content);

				console.log(`Added: ${chapterName}`);
            }
            console.groupEnd(chapters.title);

			doc.end();
			console.log(`✅ PDF generated at ${outputPath}`);
        } catch {
            doc.end();
        }
	}
};

start();
