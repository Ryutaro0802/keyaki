const FeedParser = require('feedparser');
const request = require('request');
const feed = 'http://blog.nogizaka46.com/atom.xml';
const req = request(feed);
const feedparser = new FeedParser({});
const items = [];

req.on('response', function (res) {
    this.pipe(feedparser);
});

// feedparser.on('meta', function (meta) {
//     console.log('==== %s ====', meta.title);
// });

feedparser.on('readable', function () {
    while (item = this.read()) {
        items.push(item);
    }
});

exports.feedReadEnd = new Promise((resolve, reject) => {
    feedparser.on('end', function () {
        items.forEach(function (item) {
            // console.log(item.title, item.link, item.author);
        });
        resolve(items);
    });
});