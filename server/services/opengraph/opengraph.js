const fs = require('fs');
var request = require('request');
const https = require('https');
const gm = require('gm').subClass({imageMagick: true});
var base64Img = require('base64-img');
const { sendInitiativeOpengraph } = require('./../Cloudinary');
const path = require('path')

const writeTextWithLimit = (sentence = "", limit = 15) => {
  const MAX_LENGTH = limit;

  let result = sentence.split(' ');

  result = result.reduce((acc, word) => {
    let lastLine = acc[acc.length - 1] || "";

    if (!acc.length) return [word];
    else if ((lastLine.length + word.length + 1) < MAX_LENGTH) {
      const parsedArr = acc;
      parsedArr[parsedArr.length - 1] = lastLine + " " + word;
      return [rrparsedArr]
    }
    else return [...acc, word]
  }, []);

  return result;
};

module.exports = async function makeOpenGraph(initiativeId, logoUrl, title = '', description = '') {
  console.log(logoUrl,' 22222222')
  https.get(logoUrl, async (response) => {
    const file = fs.createWriteStream("logo.png");
    var stream = response.pipe(file);
    stream.on('finish', () => {
      const board = gm(path.resolve(__dirname, "..","..","..", "static","board.png"));
      const logo = gm(response, "logo.png");

      board.composite(logo)
        .geometry('+104+104')
        .write(path.join('bb.png'), (err) => {
          console.log(err, '2222222222222222222222222')
          const result = writeTextWithLimit(title, 20);
          let boardWithLogo = gm("bb.png")
            .fill("#ffffff")
          result.forEach((element, key) => {
            boardWithLogo.font(path.resolve(__dirname, "..","..","..", "static", 'Roboto-Regular.ttf'), 64)
              .drawText(448, 88 + key * 70, element)
          })

          const description = writeTextWithLimit(description, 50)
          description.forEach((element, key) => {
            boardWithLogo.font(path.resolve(__dirname, "..","..","..", "static", 'Roboto-Regular.ttf'), 28)
              .drawText(448, 264 + key * 40, element)
          })
          console.log('qqqqqqqqqqq')
          boardWithLogo.write("cc.png", (err) => {
            console.log('wwwwww', __dirname, err)
            fs.readdir(path.resolve(__dirname), (err, files) => {
              files.forEach(file => {
                console.log(file, 'qqqqq');
              });
            })
            const base64Opengraph = base64Img.base64Sync("cc.png");
            sendInitiativeOpengraph(base64Opengraph)(initiativeId)
              .then(() => {
                // fs.unlinkSync('bb.png');
                // fs.unlinkSync('cc.png');
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa213a')
              })
          })
        })
    })
    response.on('end', )

  })
}


// makeOpenGraph();


