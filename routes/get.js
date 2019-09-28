function refferRecord() {

    var request = require('request');

    var server = 'http://f9fe8d2c.ngrok.io'
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

refferRecord();