var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function (req, res, next) {
  var data = {
    title: 'Client',
    content: '依頼者情報を登録します。'
  }
  res.render('client', data);
});

router.post('/confirm', (req, res, next) => {

  var number = req.body['number'];
  var kind = req.body['kind'];
  var name = req.body['name'];
  var description = req.body['description'];
  var zipcode = req.body['zipcode'];
  var address = req.body['address'];
  var representative = req.body['representative'];
  var telNumber = req.body['telNumber'];
  var faxNumber = req.body['faxNumber'];
  var mailAddress = req.body['mailAddress'];
  var status = req.body['status'];
  var tokki = req.body['tokki'];

  var data = {
    Headtitle: '登録完了！',
    lead: '以下の内容で、登録しました。',
    content: 'Succsess!',
    number: '管理番号： ' + number,
    kind: '種類： ' + kind,
    name: '氏名・名称： ' + name,
    description: '内容： ' + description,
    zipcode: '郵便番号： ' + zipcode,
    address: '住所： ' + address,
    representative: '代表者： ' + representative,
    telNumber: '電話番号： ' + telNumber,
    faxNumber: 'FAX番号： ' + faxNumber,
    mailAddress: 'メールアドレス： ' + mailAddress,
    status: '状態： ' + status,
    tokki: '特記事項： ' + tokki
        
  }

  
    var siteId = 1
    var server = "http://localhost"
    var url = server + "/pleasanter/api/items/" + siteId + "/create"
  
    var options = {
      uri: url,
      method: 'POST',
      encoding: 'utf8',
      headers: {
        'Content-Type': 'application/json'
      },
      json: {
        'ApiKey': process.env.PLEASANTER_API_KEY,
        'ClassI': number,
        'ClassF': kind,
        'Title': name,
        'Body': description,
        'ClassA': zipcode,
        'ClassB': address,
        'ClassC': representative,
        'ClassD': telNumber,
        'ClassE': faxNumber,
        'ClassG': mailAddress,
        'Status': status,
        'DescriptionA': tokki
        }
    };
    console.log(options);

    res.render('clientDone', data);

    request.post(options, function (error, response, body) {
      console.log(response);
      
    });
  
});

process.on('uncaughtException', function (err) {
  console.log(err);
}); 

module.exports = router;