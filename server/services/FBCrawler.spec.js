const FBCrawler = require('./FBCrawler');

let result = null;

describe('FBCrawler', function() {
  before(function(done) {
    new FBCrawler().scrapeInitiativePage().then(scraped => {
      result = scraped;
      done();
    });
  });
});
