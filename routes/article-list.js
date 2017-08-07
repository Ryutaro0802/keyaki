
const express = require('express');
const router = express.Router();
const loadFeed = require('./load-feed');

// readFeed.feedReadEnd.then(() => console.log('end'));

router.get('/keyakizaka', (req, res, next) => {
  loadFeed.feedReadEnd.then((items) => {
    res.render('article-list', { name: '欅坂46' });
  }).catch((error) => {
    console.error(error);
  });
});

router.get('/nogizaka', (req, res, next) => {
  loadFeed.feedReadEnd.then((items) => {
    const articles = [];
    items.forEach(function (item) {
      articles.push({
        title: item.title, date: item.date, author: item.author, link: item.link
      });
    });

    res.render('article-list', { articles: articles });
  }).catch((error) => {
    console.error(error);
  });
});

module.exports = router;