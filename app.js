
/* =========================================
// API                                    //
// bb3e4a6c2210a0934497ec2786f8b573-us20  //
//                                        //                    
//ID LIST                                 //
// 1b88d3bcbc                             //
 ======================================== */

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

//Allows to use local files (css/images). 
app.use(express.static('public'));

//Grab data. 
app.use(bodyParser.urlencoded({extended: true}));

//Response from the server.
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/signup.html`);
});

//Post elements. /Home Handler.
app.post('/', (req, res) => {

    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    let data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    let jsonData = JSON.stringify(data);

    // Data that the API requires to authorize posts. 
    let options = {

        url: 'https://us20.api.mailchimp.com/3.0/lists/1b88d3bcbc',
        method: 'POST',
        headers: {
            "Authorization" : "Leo bb3e4a6c2210a0934497ec2786f8b573-us20"
        },
        //body: jsonData
        
    };

    //Conditional when you post DATA to Mailchimp. 
    request(options, (error, response, body) => {
        if (error) {
            res.sendFile(`${__dirname}/failure.html`);
        } else {
            if (response.statusCode === 200) {
                res.sendFile(`${__dirname}/success.html`);
            } else {
                res.sendFile(`${__dirname}/failure.html`);
            }
        }
    });
});

//Failure Handler
app.post('/failure', (req, res) => {
    res.redirect('/');
});

//Initialize port.
app.listen(3000, () => {
    console.log("Server is starting at port 3000");
});

