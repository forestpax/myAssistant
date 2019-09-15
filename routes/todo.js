var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  var data = {
    title: 'Todo',
    content: 'Todoを登録します。'
  }
  res.render('todo', data);
});

router.post('/confirm', (req, res, next) => {
  var client = req.body['client'];
  var title = req.body['title'];
  var content = req.body['content'];
  var due = req.body['due'];
  var data = {
    Headtitle: '登録完了！',
    lead: '以下の内容で、登録しました。',
    client: '依頼者： ' + client,
    title: 'タイトル： ' + title,
    content: '内容： '+ content,
    due: '期限： '+ due
  }
  res.render('todoDone', data);


  
})

module.exports = router;