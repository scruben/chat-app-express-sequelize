const Sequelize = require('sequelize');

const db = {};

db.sequelize = new Sequelize('chat-app', 'postgres', 'ylaeuropea?', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

db.Messages = db.sequelize.define('messages', {
  content: {
    type: Sequelize.STRING
  },
  timestamp: {
    type: Sequelize.BIGINT
  },
  userid: {
    type: Sequelize.BIGINT
  }
},{
  //timestamps: false
});

module.exports = db;
