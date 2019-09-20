function createRecord(title, description, due) {

    var request = require('request');

    var ngrok = 'http://7039de0e.ngrok.io'

    var siteId = 2

    var url = "http://localhost/pleasanter/api/items/" + siteId + "/create"

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


    request.post(options, function (error, response, body) {

        console.log(error); 
        console.log(response);
        console.log(body);

    });

}

    //test
    var title = 'testTitle';
    var description = 'testTitle';
    var due = new Date();

    
createRecord(title, description, due);