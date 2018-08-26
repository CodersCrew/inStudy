
function Page(url, content) {
  this.url = url;
  this.content = content;
  this.page = null;
}

Page.prototype.openNewPage = async function(browserInstance, scrapeFunction) {
  try{
    this.page = await browserInstance.newPage();
    await this.page.goto(this.url);
    await this.page.waitFor(1000);

    return await this.page.evaluate(scrapeFunction);
  } catch (e) {
    console.error(e)
  }
};

module.exports = Page;
