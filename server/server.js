/* eslint no-console: "off" */
const {routes} = require('./routes.js')
const express = require('express')
const path = require('path')
const app = express();
const port = 3000;


routes({app});
app.use(express.static(path.resolve(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
