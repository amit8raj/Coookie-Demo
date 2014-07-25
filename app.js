var express = require('express'),
    app = express(),
    cookies = require('cookies'),
    fs = require('fs');


app.use(express.static(__dirname + '/public'));
app.use(function (req, res) {
    var ck = new cookies(req, res, ['key1', 'key1']);
    //Set cookie so that we can access from browse

    fs.readFile('public/index1.html', function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            ck.set("num",0, { signed: false, httpOnly: false });
            console.log(ck.get("num", { httpOnly: false, signed: false }));
            var tmp = (parseInt(ck.get("num", { httpOnly: false, signed: false }))||0 ) +1;
            ck.set("num",tmp, { signed: false, httpOnly: false });
            res.header('Content-Type', 'text/html');
            res.send(data);
        }
    });
});
app.listen(3000, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Listenng on PORT:3000');
    }

});
