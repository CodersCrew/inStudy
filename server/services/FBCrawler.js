const jsdom = require('jsdom');
const Crawler = require('crawler');
const puppeteer = require('puppeteer');

function FBCrawler() {
  this.result = null;
}

FBCrawler.prototype.scrapeInitiativePage = async function (url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitFor(1000);

  const result = await page.evaluate(() => {
    let title = document.querySelector('title').innerText;
    let mission = document.querySelector('div._3-8j:nth-child(1) > div:nth-child(2) > div:nth-child(2)').innerHTML;
    let about = document.querySelector('div._4-u2:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)').innerHTML;
    let created = document.querySelector('div._3xaf:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)').innerHTML;
    let site = document.querySelector('#u_0_o > div:nth-child(1)').innerHTML;
    let type = document.querySelector('._5m_o > a:nth-child(1)').innerHTML;
    let street = document.querySelector('div._20ud:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)').innerHTML;
    let city = document.querySelector('div._20ud:nth-child(2) > div:nth-child(2) > div:nth-child(2) > span:nth-child(1)').innerHTML;
    return {
      title,
      mission,
      about,
      created,
      site,
      type,
      street,
      city,
    };
  });
  console.log(result)
  await browser.close();
  return result;
};

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://www.facebook.com/pg/knwdue/about/?ref=page_internal');
//   await page.waitFor(1000);
//   const html = await page.$('#content_container');
//   const result = await page.evaluate(() => {
//     let title = document.querySelector('title').innerText;
//     let mission = document.querySelector('div._3-8j:nth-child(1) > div:nth-child(2) > div:nth-child(2)').innerHTML;
//     let about = document.querySelector('div._4-u2:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)').innerHTML;
//     let created = document.querySelector('div._3xaf:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)').innerHTML;
//     let site = document.querySelector('#u_0_o > div:nth-child(1)').innerHTML;
//     let type = document.querySelector('._5m_o > a:nth-child(1)').innerHTML;
//     let street = document.querySelector('div._20ud:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)').innerHTML;
//     let city = document.querySelector('div._20ud:nth-child(2) > div:nth-child(2) > div:nth-child(2) > span:nth-child(1)').innerHTML;
//     return {
//       title,
//       mission,
//       about,
//       created,
//       site,
//       type,
//       street,
//       city,
//     };
//   });
//   console.log(result)
//   await browser.close();
// })();
