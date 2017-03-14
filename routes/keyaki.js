const express = require('express');
const router = express.Router();
const client = require('cheerio-httpcli');
const url = 'http://www.keyakizaka46.com/s/k46o/diary/member/list?ima=0000';
let titles = [];

client.fetch(url, {}, (err, $, res) => {
  $('.box-ttl h3').each(function () {
    titles.push($(this).text());
  });
});

router.get('/', (req, res, next) => {
  res.render('keyaki', {
    title: titles
  });
});

module.exports = router;