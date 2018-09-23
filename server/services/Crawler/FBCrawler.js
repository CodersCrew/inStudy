import puppeteer from 'puppeteer';
import Page from './Page';

const FBScraper = url => {
  const pageSchema = {
    about: AboutSchema,
  };

  const key = Object.keys(pageSchema).find(singleKey => new RegExp(singleKey).test(url));
  if (!key) throw new Error('Scrape not matched');
  return pageSchema[key];
};



const AboutSchema = () => {
  const find = (selector, type = 'innerHTML') => {
    const selectedElement = document.querySelector(selector);

    if(selectedElement) {
      return selectedElement[type]
    } else return ''
  };
  return ({
    kind: 'About',
    title: find('title', 'innerText') || '',
    mission: find('div._3-8j:nth-child(1) > div:nth-child(2) > div:nth-child(2)') || '',
    about: find('div._4-u2:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)') || '',
    created: find('div._3xaf:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)') || '',
    site: find('#u_0_o > div:nth-child(1)') || '',
    type: find('._5m_o > a:nth-child(1)') || '',
    street: find('div._20ud:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)') || '',
    city: find('div._20ud:nth-child(2) > div:nth-child(2) > div:nth-child(2) > span:nth-child(1)') || '',
    logo: document.querySelector('#u_0_f > div > a > img').getAttribute('src') || 'https://screenshotlayer.com/images/assets/placeholder.png',
  });
};

const json = target => target.map(({ url, content }) => ({ url, content }));

class FBCrawler {
  constructor() {
    this.pages = [];
    this.browser = null;
  }

  addPage = url => {
    this.pages.push(new Page(url, null));
    return this;
  };

  scrape = async () => {
    try {
      this.browser = await puppeteer.launch();
      const scrapedPages = this.pages.map(async singlePage => {
        try {
          singlePage.content = await singlePage.openNewPage(this.browser, FBScraper(singlePage.url));
        } catch (e) {
          console.log(e)
          singlePage.content = { kind: 'About', logo: 'https://screenshotlayer.com/images/assets/placeholder.png' };
        }
        return singlePage;
      });
      return await Promise.all(scrapedPages).then(result => {
        this.browser.close();
        return json(result);
      });
    } catch (error) {
      console.log(error)
    }

  };
}

export default FBCrawler;
