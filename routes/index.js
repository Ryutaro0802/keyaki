const express = require('express');
const router = express.Router();
const fs = require('fs');
const client = require('cheerio-httpcli');
const Feed = require('feed');
const url = 'http://www.keyakizaka46.com/s/k46o/diary/member/list?ima=0000';
const articles = [];
const articleItems = [];
const date = new Date();



module.exports = router;