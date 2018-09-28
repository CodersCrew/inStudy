const PImage = require('pureimage');
const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});
var base64Img = require('base64-img');

async function MakeOpenGraph() {

  const board = await gm("board.png");
  const logo = gm("logo.png");

  board.composite('logo.png')
    .geometry('+104+104')
    .write('bb.png', (err, a) => {
      gm('bb.png')
        .fill("#ffffff")
        .font("./Roboto-Regular.ttf", 64)
        .drawText(448, 88, "dddd ddddddddddd dddddddddddd ddddddddddddd dddddddddddddd")
        .font("./Roboto-Regular.ttf", 28)
        .drawText(448, 264, "dddd ddddddddddd dddddddddddd ddddddddddddd dddddddddddddd")
        .write('cc.png', (err) => {
          var data = base64Img.base64Sync('cc.png');
          console.log(data)
        })
      console.log(err,a)
    })


  // board.draw(10, 50, "from scratch")
  //   .write('bb.png', (err, a) => {
  //     console.log(err,a)
  //   })
  // const board = await PImage.decodePNGFromStream(fs.createReadStream("board.png"));
  // const logo = await PImage.decodePNGFromStream(fs.createReadStream("logo.png"));
  //
  // const drawContext = board.getContext('2d');
  // drawContext.drawImage(logo, 0, 0, logo.width, logo.height, 104, 104, 240, 240);
  //
  // PImage.encodePNGToStream(board, fs.createWriteStream('aa.png'))


  // const board = await Jimp.read('board.png');
  // const logo = await Jimp.read('logo.png');
  // Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then(font => {
  //   board.print(font, 10, 10, 'Koło Naukowe Web Designu');
  //   board.composite(logo, 104, 104);
  //
  //   return board.write('lena-small-bw.jpg')


  // });

  // Jimp.loadFont('roboto.fnt').then(font => {
  //   // load font from .fnt file
  //   board.print(font, 100, 100, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"); // print a message on an image. message can be a any type
  //
  //   board.composite(logo, 104, 104);
  //
  //   return board.write('lena-small-bw.jpg')
  // });
  //
  // // await Jimp.loadFont('roboto.fnt')

}


MakeOpenGraph();
