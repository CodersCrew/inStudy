"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _Page = _interopRequireDefault(require("./Page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FBScraper = function FBScraper(url) {
  var pageSchema = {
    about: AboutSchema
  };
  var key = Object.keys(pageSchema).find(function (singleKey) {
    return new RegExp(singleKey).test(url);
  });
  if (!key) throw new Error('Scrape not matched');
  return pageSchema[key];
};

var AboutSchema = function AboutSchema() {
  var find = function find(selector) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'innerHTML';
    return document.querySelector(selector)[type];
  };

  return {
    kind: 'About',
    title: find('title', 'innerText') || '',
    mission: find('div._3-8j:nth-child(1) > div:nth-child(2) > div:nth-child(2)') || '',
    about: find('div._4-u2:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)') || '',
    created: find('div._3xaf:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)') || '',
    site: find('#u_0_o > div:nth-child(1)') || '',
    type: find('._5m_o > a:nth-child(1)') || '',
    street: find('div._20ud:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)') || '',
    city: find('div._20ud:nth-child(2) > div:nth-child(2) > div:nth-child(2) > span:nth-child(1)') || '',
    logo: document.querySelector('#u_0_f > div > a > img').getAttribute('src') || 'https://screenshotlayer.com/images/assets/placeholder.png'
  };
};

var json = function json(target) {
  return target.map(function (_ref) {
    var url = _ref.url,
        content = _ref.content;
    return {
      url: url,
      content: content
    };
  });
};

var FBCrawler = function FBCrawler() {
  var _this = this;

  _classCallCheck(this, FBCrawler);

  _defineProperty(this, "addPage", function (url) {
    _this.pages.push(new _Page.default(url, null));

    return _this;
  });

  _defineProperty(this, "scrape",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var scrapedPages;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _puppeteer.default.launch();

          case 3:
            _this.browser = _context2.sent;
            scrapedPages = _this.pages.map(
            /*#__PURE__*/
            function () {
              var _ref3 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(singlePage) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return singlePage.openNewPage(_this.browser, FBScraper(singlePage.url));

                      case 3:
                        singlePage.content = _context.sent;
                        _context.next = 10;
                        break;

                      case 6:
                        _context.prev = 6;
                        _context.t0 = _context["catch"](0);
                        console.log(_context.t0);
                        singlePage.content = {
                          kind: 'About',
                          logo: 'https://screenshotlayer.com/images/assets/placeholder.png'
                        };

                      case 10:
                        return _context.abrupt("return", singlePage);

                      case 11:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this, [[0, 6]]);
              }));

              return function (_x) {
                return _ref3.apply(this, arguments);
              };
            }());
            _context2.next = 7;
            return Promise.all(scrapedPages).then(function (result) {
              _this.browser.close();

              return json(result);
            });

          case 7:
            return _context2.abrupt("return", _context2.sent);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 10]]);
  })));

  this.pages = [];
  this.browser = null;
};

var _default = FBCrawler;
exports.default = _default;