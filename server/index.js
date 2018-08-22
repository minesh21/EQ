const express = require('express');
const pg = require('pg');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
require('dotenv').config();
const app = express()
const MAX_CALLS = 1000;
app.use(session({
  secret: 'ABCeasyASonetwothree',
  store: new RedisStore({url: process.env.REDISURL}),
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: new Date(Date.now() + (24 * 60 * 60 * 1000))},
}))

// configs come from standard PostgreSQL env vars
// https://www.postgresql.org/docs/9.6/static/libpq-envars.html

const pool = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const queryHandler = (req, res, next) => {
  if (!req.session.ip) {
    req.session.ip = req.connection.remoteAddress;
    req.session.calls = 1;
  } else {
    req.session.calls += 1;
  }
  pool.query(req.sqlQuery).then((r) => {
    return res.json(r.rows || [])
  }).catch(next)
}

const limit = (req, res, next) => {
  if (req.session.ip && req.session.ip === req.connection.remoteAddress) {
    if (req.session.calls >= MAX_CALLS) {
      return res.status(400).json({status: 'limit', error: req.session.cookie.expires});
    } 
    return next();
  }
  return next();
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.APPCLIENT);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers',  'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to EQ Works 😎')
})

app.get('/events/hourly', limit, (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, events
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 168;
  `
  return next();
}, queryHandler)

app.get('/events/hourly/aggregate', limit, (req, res, next) => {
  req.sqlQuery = `
    SELECT sum(events) AS events, date
    FROM public.hourly_events AS hourly
    GROUP BY date
    ORDER BY date
    LIMIT 168;
  `
  return next();
}, queryHandler)

app.get('/events/hourly/list?*', limit, (req, res, next) => {
  req.sqlQuery = `
    SELECT SUM(${req.query.metric}) AS ${req.query.metric}, hourly.poi_id, poi.lat, poi.lon
    FROM public.hourly_events AS hourly
    INNER JOIN public.poi AS poi
    ON poi.poi_id = hourly.poi_id
    WHERE hourly.date BETWEEN '${req.query.startDate}' AND '${req.query.endDate}'
    GROUP BY hourly.poi_id, lat, lon
    LIMIT 168;
    `
  return next();
}, queryHandler)

app.get('/stats/hourly/list?*', limit, (req, res, next) => {
  req.sqlQuery = `
      SELECT SUM(${req.query.metric}) AS ${req.query.metric}, hourly.poi_id, poi.lat, poi.lon
      FROM public.hourly_stats AS hourly
      INNER JOIN public.poi AS poi
      ON poi.poi_id = hourly.poi_id
      WHERE hourly.date BETWEEN '${req.query.startDate}' AND '${req.query.endDate}'
      GROUP BY hourly.poi_id, lat, lon
      LIMIT 168;
  `
  return next();
}, queryHandler)

app.get('/events/daily', limit, (req, res, next) => {
  req.sqlQuery = `
    SELECT date, SUM(events) AS events
    FROM public.hourly_events
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  return next()
}, queryHandler)

app.get('/stats/hourly', limit, (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue, poi_id
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT 168;
  `
  return next()
}, queryHandler)

app.get('/stats/daily', limit, (req, res, next) => {
  req.sqlQuery = `
    SELECT date,
        SUM(impressions) AS impressions,
        SUM(clicks) AS clicks,
        SUM(revenue) AS revenue
    FROM public.hourly_stats
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  return next()
}, queryHandler)

app.get('/poi', limit, (req, res, next) => {
  req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `
  return next()
}, queryHandler)

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`)
  }
})

// last resorts
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  process.exit(1)
})
