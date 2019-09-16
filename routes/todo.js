var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function (req, res, next) {
  var data = {
    title: 'Todo',
    content: 'Todoを登録します。'
  }
  res.render('todo', data);
});

router.post('/confirm', (req, res, next) => {
  var client = req.body['client'];
  var title = req.body['title'];
  var description = req.body['description'];
  var due = req.body['due'];
  var data = {
    Headtitle: '登録完了！',
    lead: '以下の内容で、登録しました。',
    client: '依頼者： ' + client,
    title: 'タイトル： ' + title,
    description: '内容： ' + description,
    due: '期限： ' + due
  }
  res.render('todoDone', data);

  /*
    var localhost = ''
    var siteId = 2
    var url = ngrok + "http://localhost/80/pleasanter/api/items/" + siteId + "/create"
  
    var options = {
      uri: url,
      method: 'POST',
      encoding: 'utf8',
      headers: {
        'Content-Type': 'application/json'
      },
      json: {
        'ApiKey': process.env.PLEASANTER_API_KEY,
        'Title': title,
        'Body': description,
        'CompletionTime': due,
      }
    };
    console.log(title);
  
    request.post(options, function (error, response, body) {
      console.log(body);
    });
  
  */
  
    var api_key = process.env.TRELLO_API_KEY;
    var api_token = process.env.TRELLO_API_TOKEN;
    var list_id = process.env.TRELLO_LIST_ID;
  
    var url2 = 'https://api.trello.com/1/cards/?key=' + api_key + '&token=' + api_token;
    var options2 = {
      uri: url2,
      method: 'POST',
      encoding: 'utf8',
      headers: {
        'Content-Type': 'application/json'
      },
      json: {
        'name': client + "・" + title,
        'desc': description,
        'due': due,
        'idList': list_id,
        'urlSource': ''
      }
    };
  
    request.post(options2, function (error, response, body) {
      console.log(body);
      console.log(client + "・" + title + "を登録しました。");
      
    });
  

});

module.exports = router;