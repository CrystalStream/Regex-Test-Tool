const express = require('express')
const app = express()

if(process.env.NODE_ENV === 'production') {
  const forceSSL = function() {
    return function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(
         ['https://', req.get('Host'), req.url].join('')
        );
      }
      next();
    }
  }

  // Instruct the app
  // to use the forceSSL
  // middleware
  app.use(forceSSL());
}

app.all('/*', function(req, res) {
  res.sendFile('index.html' , { root : __dirname});
});

app.listen(process.env.PORT || 5000);
