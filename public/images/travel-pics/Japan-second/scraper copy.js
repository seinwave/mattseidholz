const cheerio = require('cheerio');
var request = require("request").defaults({rejectUnauthorized:false});
const fs = require('fs')

let urls = [];

request({
    method: 'GET',
    url: 'http://mattseidholz.com/trip-report-the-return-to-japan-part-2/'
}, (err, res, body) => {

    if (err) return console.error(err)

    let $ = cheerio.load(body)

    

    $('img').each(function(i, elem) {
        urls[i] = $(this).attr('src').replace('-300x225', '')
      });

      console.log(urls);

    let i = 27

    for (let url of urls) {
    request.get(url)
    .on('error',function(err){
    console.log(err);
    })
    .on('response',function(response){
    if(response.statusCode == 200){
    console.log("successfully retreived image from url");
    }
    })
    .pipe(fs.createWriteStream('JapanTogether-' + `pic${i}.jpg`));
    i++
        }
    })
