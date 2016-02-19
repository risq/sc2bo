const path = require('path');
const express = require('express');
const shortid = require('shortid');
const dbg = require('debug')('sc2bo:app');
const config = require('./config/config.json');
const nunjucks = require('nunjucks');

const app = express();
const server = require('http').Server(app);
const db = require('./src/server/db');
const BuildOrder = require('./src/server/buildOrder');

const bo1 = new BuildOrder({
  title: 'Lorem ipsum dolor sit amet',
  playerRace: 'P',
  opponentRace: 'Z',
  strategy: 'All-In',
  description: 'Sed laeditur hic coetuum magnificus splendor levitate paucorum incondita, ubi nati sunt non reputantium, sed tamquam indulta licentia vitiis ad errores lapsorum ac lasciviam. ut enim Simonides lyricus docet, beate perfecta ratione vieturo ante alia patriam esse convenit gloriosam.',
  steps: [
    {
      pop: 8,
      unit: 'scv',
      time: '0:10',
      comment: 'Sed laeditur hic coetuum magnificus',
    },
    {
      pop: 16,
      unit: 'reaper',
      time: '1:05',
      comment: null,
    },
  ],
});

db.saveBuildOrder(bo1);

nunjucks.configure(path.join(__dirname, './src/shared/templates'), {
  autoescape: true,
  express: app,
});

app.set('view engine', 'nunjucks');
app.use(express.static('public'));

const port = process.env.PORT || 3030;

app.get('/config', (req, res) => res.json(config.client));
app.get('/', (req, res) => {
  db.getBuildOrders()
    .then(buildOrders => res.render('index.html', {buildOrders}));
});
app.get('/bo/:id', (req, res) => {
  db.getBuildOrderById(req.params.id)
    .then(buildOrder => res.render('buildOrder.html', {buildOrder}))
    .catch(err => res.render('error.html'));
});

server.listen(port, () => {
  dbg(`Express server listening on port ${port}`);
});

exports = module.exports = app;
