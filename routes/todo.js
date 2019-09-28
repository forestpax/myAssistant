var express = require('express');
var router = express.Router();
var request = require('request');

var clientList = clientListMaker();

router.get('/', function (req, res, next) {
  var data = {
    title: 'Todo',
    content: 'Todoを登録します。',
    clientList: clientList,
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

  
    var siteId = 2
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
        'Title': title,
        'Body': description,
        'CompletionTime': due,
      }
    };
    console.log(title);
  
    request.post(options, function (error, response, body) {
      console.log(response);
      
    });
  
  
  
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

function clientListMaker() {

  var request = require('request');

  var server = 'http://7f512e8a.ngrok.io'
  //var server = 'http://localhost'

  var siteId = 1
  var clientList = [];



  var url = server + "/pleasanter/api/items/" + siteId + "/get"

  var options = {
      uri: url,
      method: 'POST',
      encoding: 'utf8',
      headers: {
          'Content-Type': 'application/json'
      },
      json: {
          'ApiKey': process.env.PLEASANTER_API_KEY,
          'Offset': 0,
          'View': {

          }
      }
  };


  request.post(options, function (error, response, body) {
      for (var i = 0; i < body.Response.Data.length; i++){
          clientList.push(body.Response.Data[i].Title);
      }
  });

  return clientList

}



process.on('uncaughtException', function (err) {
  console.log(err);
}); 

module.exports = router;
