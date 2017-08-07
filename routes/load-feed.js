const FeedParser = require('feedparser');
const request = require('request');
const feed = 'http://blog.nogizaka46.com/atom.xml';
const req = request(feed);
const feedparser = new FeedParser({});
const items = [];

exports.feedReadEnd = new Promise((resolve, reject) => {
    req.on('response', function (res) {
        this.pipe(feedparser);
    });

    feedparser.on('readable', function () {
        while (item = this.read()) {
            items.push(item);
        }
    });

    feedparser.on('end', function () {
        resolve(items);
    });
});