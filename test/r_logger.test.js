test("logger:init", function() {
  
  delete localStorage.loggerLevel;
  logger.init();

  ok( parseInt(localStorage.loggerLevel) == logger.levels.WARNING, "Passed!");

  logger.init();
  ok( parseInt(localStorage.loggerLevel) == logger.levels.WARNING, "Passed!");

});

test("logger:level", function() {
  
  logger.init();
  ok( parseInt(localStorage.loggerLevel) == logger.levels.WARNING, "Passed!");
  ok( logger.level() == logger.levels.WARNING, "Passed!");

  logger.level(logger.levels.ERROR);
  ok( logger.level() == logger.levels.ERROR, "Passed!");

  logger.level(logger.levels.INFO);
  ok( logger.level() == logger.levels.INFO, "Passed!");
});

test("logger:debug", function() {
  
  logger.level(logger.levels.DEBUG);
  ok( logger.debug("bad").search(/\[[0-9\.:]*\] \[DEBUG\].*bad$/) != -1, "Passed!");
  ok( logger.debug("test failed", 123).search(/\[[0-9\.:]*\] \[DEBUG\].*test failed 123$/) != -1, "Passed!");

  logger.level(logger.levels.ERROR);
  ok( logger.debug("test failed", 123) == false, "Passed!");

});

test("window:debug", function() {
  
  logger.level(logger.levels.DEBUG);
  ok( debug("bad").search(/\[[0-9\.:]*\] \[DEBUG\].*bad$/) != -1, "Passed!");
  ok( debug("test failed", 123).search(/\[[0-9\.:]*\] \[DEBUG\].*test failed 123$/) != -1, "Passed!");

  logger.level(logger.levels.NONE);
  ok( debug("test failed", 123) == false, "Passed!");

});
