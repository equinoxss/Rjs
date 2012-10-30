
window.logger = {
  levels: {
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
    NONE: 99
  },
  _pad: function(d) {
    return (d < 10) ? "0" + d : d;
  },
  _log: function() {
    var date = new Date(),
        hours = logger._pad(date.getHours()),
        mins = logger._pad(date.getMinutes()),
        secs = logger._pad(date.getSeconds()),
        mils = date.getMilliseconds(),
        msg = ["[" + hours + ":" + mins + ":" + secs + "." + mils + "]", arguments[0] ].concat(Array.prototype.slice.call(arguments[1])).join(" ");
    console.log(msg);
    return msg;
  },
  debug: function() {
    if (logger.level() <= logger.levels.DEBUG) {
      return logger._log("[DEBUG]", arguments);
    }
    return false;
  },
  info: function() {
    if (logger.level() <= logger.levels.INFO) {
      return logger._log("[INFO ]", arguments);  
    }
    return false;
  },
  warning: function() {
    if (logger.level() <= logger.levels.WARN) {
      return logger._log("[WARN ]", arguments);
    }
    return false;
  },
  error: function() {
    if (logger.level() <= logger.levels.ERROR) {
      return logger._log("[ERROR]", arguments);
    }
    return false;
  },
  init: function() {
    if (!localStorage.loggerLevel) {
      return logger.level(logger.levels.WARN);
    }
  },
  level: function() {
    if (arguments.length === 0) {
      return parseInt(localStorage.loggerLevel);
    }
    return localStorage.loggerLevel = arguments[0];
  }
};
