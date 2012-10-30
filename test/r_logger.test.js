QUnit.testStart(function( details ) {
  delete localStorage.loggerLevel;
});

test("logger:init", function() {
  
  logger.init();
  ok( parseInt(localStorage.loggerLevel) == logger.levels.ERROR, "Was: " + localStorage.loggerLevel + "  expected: " + logger.levels.ERROR);

  logger.level(logger.levels.INFO);
  logger.init();
  ok( parseInt(localStorage.loggerLevel) == logger.levels.INFO, "Passed!");

});

test("logger:level", function() {
  
  logger.init();
  ok( parseInt(localStorage.loggerLevel) == logger.levels.ERROR, "Was: " + localStorage.loggerLevel + "  expected: " + logger.levels.ERROR);
  ok( logger.level() == logger.levels.ERROR, "Was: " + localStorage.loggerLevel + "  expected: " + logger.levels.ERROR);

  logger.level(logger.levels.NONE);
  ok( logger.level() == logger.levels.NONE, "Was: " + localStorage.loggerLevel + "  expected: " + logger.levels.NONE);

  logger.level(logger.levels.INFO);
  ok( logger.level() == logger.levels.INFO, "Was: " + localStorage.loggerLevel + "  expected: " + logger.levels.INFO);
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
