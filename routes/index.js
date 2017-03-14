const express = require('express');
const router = express.Router();
const client = require('cheerio-httpcli');
const url = 'http://www.keyakizaka46.com/s/k46o/diary/member/list?ima=0000';
const articles = [];

client.fetch(url, {}, (err, $, res) => {
  $('article').each(function (i) {
    articles[i] = { date: null, title: null, name: null };

    const date = articles[i].date = $(this).find('.box-date').eq(0).text() + $(this).find('.box-date').eq(1).text();
    const title = articles[i].title = $(this).find('.box-ttl h3').text();
    const name = articles[i].name = $(this).find('.box-ttl .name').text();

    console.log(articles[i]);
  });
});

router.get('/', (req, res, next) => {
  res.render('index', {
    articles
  });
});

module.exports = router;