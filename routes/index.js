const express = require('express');
const router = express.Router();
const fs = require('fs');
const client = require('cheerio-httpcli');
const url = 'http://www.keyakizaka46.com/s/k46o/diary/member/list?ima=0000';
const articles = [];
const articleItems = [];
const date = new Date();

client.fetch(url, {}, (err, $, res) => {
  $('article').each(function (i) {
    articles[i] = { date: null, title: null, href: null, name: null, imgSrc: null, content: null };

    const date = articles[i].date = $(this).find('.box-date').eq(0).text() + $(this).find('.box-date').eq(1).text();
    const title = articles[i].title = $(this).find('.box-ttl h3').text();
    const href = articles[i].href = $(this).find('.box-ttl a').attr('href');
    const name = articles[i].name = $(this).find('.box-ttl .name').text();
    const imgSrc = articles[i].imgSrc = $(this).find('img').eq(0).attr('src');
    const content = articles[i].content = $(this).find('.box-article').html();

    articleItems.push(`<entry>
        <id>id:${href}</id>
		    <title>${title}</title>
		    <link rel='alternate' type='text/html' href='${href}' />
		    <updated>${date}</updated>
        <content type="xhtml" xml:lang="ja" xml:base="http://diveintomark.org/">${content}</content>
      </entry>`);
  });

  const atom = `<?xml version='1.0' encoding='UTF-8'?>
<feed xmlns='http://www.w3.org/2005/Atom' xml:lang='ja'>
	<id>tag:keyakizakafeed/</id>
	<title>欅坂46ブログ更新情報</title>
	<updated>${date}</updated>
	<link rel='alternate' type='text/html' href='https://keyaki-blog.herokuapp.com/' />
	<link rel='self' type='application/atom+xml' href='https://keyaki-blog.herokuapp.com/atom.xml' />
</feed>`;

  fs.writeFile('public/atom.xml', atom);

  router.get('/', (req, res, next) => {
    res.render('index', { articles });
  });
});




module.exports = router;