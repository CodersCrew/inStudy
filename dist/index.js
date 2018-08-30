"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieSession = _interopRequireDefault(require("cookie-session"));

var _passport = _interopRequireDefault(require("passport"));

var _keys = _interopRequireDefault(require("./config/keys"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _routes = _interopRequireDefault(require("./routes"));

var _models = _interopRequireDefault(require("./models"));

var _passport2 = _interopRequireDefault(require("./services/passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _models.default)();
(0, _passport2.default)();
var app = (0, _express.default)();
app.set('views', _path.default.join(__dirname, '/views'));
app.set('view engine', 'ejs'); // app.use(fileUpload());

app.use((0, _cookieSession.default)({
  maxAge: _keys.default.sessionDuration,
  keys: [_keys.default.cookieKey]
}));
app.use(_passport.default.initialize());
app.use(_passport.default.session());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.get('/', function (req, res, next) {
  res.render('index', {});
});
(0, _routes.default)(app);

if (process.env.NODE_ENV === 'production') {
  app.use(_express.default.static(_path.default.resolve(__dirname, '..', 'public')));
  app.get('*', function (req, res) {
    res.sendFile(_path.default.resolve(__dirname, '..', 'public', 'index.html'));
  });
}

app.listen(_keys.default.PORT, function () {
  console.info("App listening on port ".concat(_keys.default.PORT));
});