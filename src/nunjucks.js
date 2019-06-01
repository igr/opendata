"use strict";

const rs = require('./filters/rs');
const filesizeformat = require('./filters/filesizeformat');

module.exports = nunjucksEnv => {
  nunjucksEnv
    .addFilter('rsDateShort', rs.dateShort)
    .addFilter('rsDateLong', rs.dateLong)

    .addFilter('fsf', filesizeformat)
  ;
};
