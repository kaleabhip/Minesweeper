const http = require('http');
const port = 3000;
const fs = require('fs');

app.get('/', (req, res) => {
    fs.readFile("index.html", function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})