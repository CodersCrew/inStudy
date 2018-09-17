class Page {
  constructor(url, content) {
    this.url = url;
    this.content = content;
    this.page = null;
  }

  openNewPage = async (browserInstance, scrapeFunction) => {
    try {
      this.page = await browserInstance.newPage();

      await this.page.goto(this.url);
      await this.page.waitFor(3000);
      return this.page.evaluate(scrapeFunction);
    } catch (e) {
      console.error(e);
    }
  };
}

export default Page;
