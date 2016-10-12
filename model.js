'use strict';

// const fs = require('fs');
// const database = './db/messages.db';

//const pg = require('pg');
const Sequelize = require('sequelize');

const dm = {};

const dbConfig = {
  user: 'postgres',
  database: 'chat-app',
  password: 'ylaeuropea?',
  host: 'localhost',
  max: 10,
  idleTimeoutMillis: 30000
};

const sequelize = new Sequelize('chat-app', 'postgres', 'ylaeuropea?', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

var Messages = sequelize.define('messages', {
  content: {
    type: Sequelize.STRING
  },
  timestamp: {
    type: Sequelize.BIGINT
  },
  userid: {
    type: Sequelize.BIGINT
  }
});

dm.writeMessage = function(message) {
  // return new Promise(function (resolve, reject) {
  //   var timestamp = Date.now();
  //   pool.connect(function (err, client, done) {
  //     if (err) reject(err);
  //     client.query('INSERT INTO messages (content, timestamp) VALUES ($1,$2);', [message.content, timestamp], function (err, result) {
  //       done();  // release the client back to the pool
  //       if (err) reject(err);
  //       resolve({content: message.content, timestamp: timestamp});
  //     });
  //   });
  // });
};

dm.loadMessages = function (options) {
  var queryParam;
  if (options && options.limit) {
    queryParam = {
      attributes: ['content', 'timestamp'],
      order: 'timestamp DESC',
      limit: options.limit
    };
  } else if (options && options.lasttimestamp) {
    queryParam = {
      attributes: ['content', 'timestamp'],
      order: 'timestamp DESC',
      where: {
        timestamp: {
          $gt: options.lasttimestamp
        }
      },
    };
  }
  Messages.findAll(queryParam).then(function(messages) {
    console.log(messages.get());
  });

  // return new Promise(function (resolve, reject) {
  //   let query;
  //   let value;
  //   if (options && options.limit) {
  //     query = 'SELECT content, timestamp FROM messages ORDER BY timestamp DESC LIMIT $1;';
  //     value = options.limit;
  //   } else if (options && options.lasttimestamp) {
  //     query = 'SELECT content, timestamp FROM messages WHERE timestamp > $1 ORDER BY timestamp ASC;';
  //     value = options.lasttimestamp;
  //   }
  //   pool.connect(function (err, client, done) {
  //     if (err) reject(err);
  //     client.query(query, [ value ], function (err, result) {
  //       done();  // release the client back to the pool
  //       if (err) reject(err);
  //       else resolve(result.rows.reverse());
  //     });
  //   });
  // });
};

module.exports = dm;
