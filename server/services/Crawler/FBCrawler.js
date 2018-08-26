const puppeteer = require('puppeteer');
const Page = require('./Page');

let FBScraper = (url) => {
  const pageSchema = {
    'about': AboutSchema,
  };

    const key = Object.keys(pageSchema)
    .find((singleKey) => new RegExp(singleKey).test(url));
    if(!key) throw new Error('Scrape not matched');

  return pageSchema[key]

}

function FBCrawler() {
  this.pages = [];
  this.browser = null;
}

FBCrawler.prototype.addPage = function(url) {
  this.pages.push(new Page(url, null));
  return this;
};

function json(target) {
  return target.map(({ url, content }) => ({ url, content }));
}


FBCrawler.prototype.scrape = async function () {
  this.browser = await puppeteer.launch();
  const scrapedPages = this.pages.map(async (singlePage) => {
    singlePage.content = await singlePage.openNewPage(this.browser, FBScraper(singlePage.url));
    return singlePage;
  });
  return await Promise.all(scrapedPages)
    .then((result) => {
      this.browser.close()
      return json(result);
    })
};




function AboutSchema() {
  let title = document.querySelector('title').innerText;
  let mission = document.querySelector('div._3-8j:nth-child(1) > div:nth-child(2) > div:nth-child(2)').innerHTML;
  let about = document.querySelector('div._4-u2:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)').innerHTML;
  let created = document.querySelector('div._3xaf:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)').innerHTML;
  let site = document.querySelector('#u_0_o > div:nth-child(1)').innerHTML;
  let type = document.querySelector('._5m_o > a:nth-child(1)').innerHTML;
  let street = document.querySelector('div._20ud:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)').innerHTML;
  let city = document.querySelector('div._20ud:nth-child(2) > div:nth-child(2) > div:nth-child(2) > span:nth-child(1)').innerHTML;
  let logo = document.querySelector('#u_0_f > div > a > img').getAttribute('src')
  return {
    kind: 'About',
    title,
    mission,
    about,
    created,
    site,
    type,
    street,
    city,
    logo,
  };
}

module.exports = FBCrawler;

// let a = new FBCrawler()
// a.addPage('https://www.facebook.com/pg/ccrew18/about/?ref=page_internal');
// a.scrape()
//   .then((f) => console.log(f))
