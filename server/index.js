const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(enforceHTTPS);

// https redirect
function enforceHTTPS(request, response, next) {
  if (process.env.NODE_ENV === 'development') return next();
  
  if (request.headers['x-forwarded-proto'] !== 'https') {
    const httpsUrl = ['https://', request.headers.host, request.url].join('');
    return response.redirect(httpsUrl);
  }

  return next();
}

// helper for db connection pooling
function queryDatabase(text, values, cb) {
  const connectionUrl = (process.env.NODE_ENV === 'development')
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL +'?ssl=true';
  pg.connect(connectionUrl, function(err, client, done) {
    client.query(text, values, function(err, result) {
      done();
      cb(err, result);
    });
  });
};

app.get('/health', (request, response) => {
  console.log('/health');
  response.status(200);
  response.json({ status: 'ok' });
});

app.post('/program', (request, response) => {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const {userKey, xmlText} = request.body;
  const values = [userKey, xmlText, timestamp];
  const sql = `
    INSERT INTO programs(user_key, xml, timestamp)
    VALUES ($1,$2,to_timestamp($3))`;
  queryDatabase(sql, values, (err, result) => {
    if (err) {
      console.log({ error: err });
      return response.status(500);
    }
    console.log(JSON.stringify(result));
    response.status(201);
    return response.json({ status: 'ok' });
  });
});

app.use(express.static('ui/public/samples'));
app.use(express.static('ui/build'));

// start server
app.set('port', (process.env.PORT || 4000));
app.listen(app.get('port'), function() {
  console.log('Server is running on port:', app.get('port'));
});