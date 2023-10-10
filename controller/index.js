const session = require('express-session');

exports.index = (req, res) => {
  res.render('index');
  console.log(req.session);
};

exports.Cget_login = (req, res) => {
  res.render('login');
};

exports.Cget_register = (req, res) => {
  res.render('register');
};

exports.Cget_mypage = (req, res) => {
  res.render('mypage');
};

///상세페이지
exports.Cget_intro_seoul = (req, res) => {
  res.render('intro_seoul');
};
exports.Cget_intro_busan = (req, res) => {
  res.render('intro_busan');
};
exports.Cget_intro_gangneung = (req, res) => {
  res.render('intro_gangneung');
};
exports.Cget_intro_jeju = (req, res) => {
  res.render('intro_jeju');
};
///
