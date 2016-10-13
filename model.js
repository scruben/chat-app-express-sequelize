'use strict';

const db = require('./db.js');

const dm = {};

dm.writeMessage = function(message) {
  var timestamp = Date.now();
  return db.Messages.create({content: message.content, timestamp: timestamp});
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
      }
    };
  }
  return db.Messages.findAll(queryParam);
};

module.exports = dm;
