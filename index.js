const express = require('express');
const mysql = require('mysql');
const http = require('http')
const fs = require('fs');
const bodyParser = require('body-parser')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'apii'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/example', (req, res) => {
    console.log(req.body)
    connection.query('INSERT INTO haberler (baslik,icerik,resim) values (?,?,?)', [req.body.baslik,req.body.icerik,req.body.resim], (err,result,fields) => {
        if(err){
            console.log(err);
            res.send("Kayıt Başarısız" + err)
        } else {
            console.log("Data:");
            console.log(result);
            res.send('Kayıt Başarılı')
        }
    })
    //res.send(`Full name is:${req.body.baslik} ${req.body.icerik}.`);

});

port = 8080

app.listen(port, () => {
    console.log(`Server running on port${port}`);
});
  


/*let handleRequest = ((req, response) => {
    //res.send('Hello World!')
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('./index.html', null, function(err,data){
        if(err){
            response.writeHead(404);
            respone.write('Whoops! File not found!');
        } else {
            response.write(data);
        }
        response.end();
    })
})

http.createServer(handleRequest).listen(8000);

/*app.post('/bbb', (req,res) => console.log("aaaa"))



app.listen(3000,() => console.log('Example app listening on port 3000!'))*/