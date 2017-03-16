const express = require('express');
const router = express.Router();
const fs = require('fs');
const client = require('cheerio-httpcli');
const url = 'http://www.keyakizaka46.com/s/k46o/diary/member/list?ima=0000';
const articles = [];
const rss = `
<?xml version=”1.0″ encoding=”utf-8″ ?>
<rss version=”2.0″>
<channel>
  <title>欅坂ブログまとめ</title>
  <link>（サイトのURL）</link>
  <lastBuildDate>Sat, 28 Oct 2006 00:00:00 +0900</lastBuildDate>
  <item>
    <title>（各情報のタイトル）</title>
    <link>（各情報のURL）</link>
    <category>（カテゴリをつけたい場合は入力。「お知らせ」「更新情報」など）</category>
    <pubDate>Sat, 28 Oct 2006 00:00:00 +0900</pubDate>
  </item>
</channel>
</rss>
`;


fs.writeFile('public/rss.xml', rss);

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