const htmlParser = require("node-html-parser");
const fetch = require('node-fetch');
const fs = require('fs');

if (!fs.existsSync('./images')) {
    fs.mkdirSync('images');
}

const downloadFile = (async (url, path) => {
    const res = await fetch(url);
    const fileStream = fs.createWriteStream(path);
    await new Promise((resolve, reject) => {
        res.body.pipe(fileStream);
        res.body.on("error", (err) => {
            reject(err);
        });
        fileStream.on("finish", function () {
            resolve();
        });
    });
});

const wait = (seconds) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), seconds * 1000)
    })
}

function extractAnswer(answer) {

    const isCorrect = answer.attributes.style.trim() === 'background-color:#33FF33;';
    const answerText = answer.childNodes[1].rawText.trim();

    return {
        isCorrect,
        answerText
    };
}

const sanitizeUrl = (url) => {
    let tokens = url.split('/');

    if(tokens == 5) {
        return url;
    }

    tokens.pop();
    return tokens.join('/');
}

let questionNumber = 1;
const visitedUrls = new Set();

async function crawl(startUrl) {
    const questions = [];

    let url = startUrl;
    while (url !== null) {
        if (url.startsWith('https://www.e-drpciv.ro/intrebare/3941')) {
            url = 'https://www.e-drpciv.ro/intrebare/3942'
        }

        if (visitedUrls.has(url)) {
            break;
        }

        visitedUrls.add(url);

        const html = await fetch(url).then(res => res.text());

        const parsedContent = htmlParser.parse(html, { style: true });
        parsedContent;

        const questionNode = parsedContent.childNodes[0].childNodes[28].childNodes[1];

        const containerNode = parsedContent.querySelectorAll('.w3-container')[1];

        const imgNode = containerNode.childNodes[1].tagName === 'img'
            ? containerNode.childNodes[1]
            : null;

        const answersNode = imgNode
            ? containerNode.childNodes[2]
            : containerNode.childNodes[1];

        const categoryNode = containerNode.childNodes[4].text.startsWith('drpciv cat.:')
            ? containerNode.childNodes[5]
            : containerNode.childNodes[4];

        const questionData = (() => {
            const answerData = answersNode.childNodes.map(node => extractAnswer(node));

            const result = {
                question: questionNode.rawText,
                answers: answerData,
                categories: categoryNode.text.split(',').map(x => x.trim()),
                href: url
            };

            if (imgNode) {
                const imageUrl = imgNode ? imgNode.attributes.src : null;

                result.image = {
                    url: imageUrl,
                    name: imageUrl.split('/').pop()
                };
            }

            return result;
        })();

        if (questionData.image) {
            const { url, name } = questionData.image;
            await downloadFile(url, `./images/${name}`);
        }

        questions.push(questionData);
        console.log(`Question ${questionNumber++} ${url}`);

        const paragraphNode = parsedContent.querySelector('p');
        if (paragraphNode.childNodes.length <= 2 && url !== startUrl) {
            break;
        }

        url = sanitizeUrl(paragraphNode.lastChild.attributes["href"]);

        await wait(0.2);
    }

    return questions;
}

async function main() {
    let questions = [];

    const startingUrls = [
        // 'https://www.e-drpciv.ro/intrebare/3975',
        'https://www.e-drpciv.ro/intrebare/3974', // A
        'https://www.e-drpciv.ro/intrebare/1',    // B
        'https://www.e-drpciv.ro/intrebare/3975', // C
        'https://www.e-drpciv.ro/intrebare/2028', // D
        'https://www.e-drpciv.ro/intrebare/2468', // E
        'https://www.e-drpciv.ro/intrebare/1563', // Tr
        'https://www.e-drpciv.ro/intrebare/3977', // Redobandire 13 din 15
    ];

    for (const url of startingUrls) {
        const crawledQuestions = await crawl(url);
        questions = [...questions, ...crawledQuestions];
    }

    fs.writeFileSync('./questions.json', JSON.stringify(questions));
}

main();
