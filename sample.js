const cheerio = require('cheerio');
const URI = require("urijs");
const moment = require('moment');

// const text = `<p>Wednesday Campanella concert was unsurprisingly on a Wednesday. And definitely one of the best concerts I&#8217;ve been to. Through the use of artist visual affects, the organizers created a beautiful musical experience. Out of the mist illuminated by lights, after keeping crowd in anticipation, finally emerged the singer. Many of the light effects used in&hellip; <a class="more-link" href="https://naranoeur.wordpress.com/2018/11/07/wednesday-campanella-%e6%b0%b4%e6%9b%9c%e6%97%a5%e3%81%ae%e3%82%ab%e3%83%b3%e3%83%91%e3%83%8d%e3%83%a9-concert/">Continue reading <span class="screen-reader-text">Wednesday Campanella (水曜日のカンパネラ)&nbsp;Concert</span> <span class="meta-nav" aria-hidden="true">&rarr;</span></a></p>`;
//
//
// const $ = cheerio.load(text);
// const href = $('a.more-link').attr('href');
// const uri = new URI(href);
// const internalHref = uri.segment().filter(segment => segment.length > 0).pop()
// $('a.more-link').attr('href', `/${internalHref}`);
// console.log($.html());

const date = moment("2018-11-03T03:02:35.000Z").format("MMMM DD, YYYY")
console.log(date);
