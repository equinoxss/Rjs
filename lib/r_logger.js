
window.logger = {
  levels: {
    DEBUG: 1,
    INFO: 2,
    WARNING: 3,
    ERROR: 4,
    NONE: 99
  },
  _pad: function(d,s) {
    var padded = d.toString();
    while (padded.length < s) {
      padded = "0" + padded;
    }
    return padded;
  },
  _log: function() {
    var date = new Date(),
        hours = logger._pad(date.getHours(),2),
        mins = logger._pad(date.getMinutes(),2),
        secs = logger._pad(date.getSeconds(),2),
        mils = logger._pad(date.getMilliseconds(),3),
        msg = ["[" + hours + ":" + mins + ":" + secs + "." + mils + "]", arguments[0] ].concat(Array.prototype.slice.call(arguments[1])).join(" ");
    console.log(msg);
    return msg;
  },
  init: function() {
    if (!localStorage["loggerLevel"]) {
      return logger.level(logger.levels.WARNING);
    }
    for (level in logger.levels) {
      var ctx = { prefix: "[" + level + "]", logLevel: logger.levels[level] },
          funcName = level.toLowerCase();
      var handler = function() {
        if (logger.level() <= this.logLevel) {
          return logger._log(this.prefix, arguments);
        }
        return false;
      }.bind(ctx);
      window.logger[funcName] = handler;
      window[funcName] = handler;
    }
  },
  level: function() {
    if (arguments.length === 0) {
      return parseInt(localStorage["loggerLevel"]);
    }
    return localStorage["loggerLevel"] = arguments[0];
  }
};

window.logger.init();
