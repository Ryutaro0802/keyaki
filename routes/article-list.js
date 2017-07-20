
const express = require('express');
const router = express.Router();

router.get('/keyakizaka', (req, res, next) => {
  res.render('article-list', { name: '欅坂46' });
});

router.get('/nogizaka', (req, res, next) => {
  res.render('article-list', { name: '乃木坂46' });
});

module.exports = router;