require "uglifier"
require "phantomjs"

# Colorized terminal output
# http://stackoverflow.com/questions/2070010/how-to-output-my-ruby-commandline-text-in-different-colours
def colorize(text, color_code)
  "\e[#{color_code}m#{text}\e[0m"
end

def red(text); colorize(text, 31); end
def green(text); colorize(text, 32); end


LIB_GLOB = "./lib/**/*.js"
OUTPUT_PATH = "./bin/"

desc "Builds all the js files in the library."
task :build do
  output = ""
  Dir.glob(LIB_GLOB) do |path|
    puts "Adding: #{green(path)}"

    output += File.read(path)
  end

  FileUtils.mkdir_p OUTPUT_PATH unless Dir.exists?(OUTPUT_PATH)

  # Write the unminified script
  unminified_path = OUTPUT_PATH + "rjs.js"
  puts "Writing #{green(unminified_path)}"
  File.open(unminified_path, 'w') do |file|
    file.write(output)
    file.close
  end

  # Uglify and write the minified script
  output = Uglifier.new.compile(output)
  minified_path = OUTPUT_PATH + "rjs-min.js"
  puts "Writing #{green(minified_path)}"
  File.open(minified_path, 'w') do |file|
    file.write(output)
    file.close
  end  
end

desc "Run tests using phantomjs."
task :test do
  path = Phantomjs.path

  cmd = "#{path} ./test/vendor/run-qunit.js"
  cmd << " \"file://localhost#{File.dirname(__FILE__)}/test/test.html\""

  system cmd

  if $?.success?
    puts green("Tests Passed")
  else
    puts red("Tests Failed")
  end
end

desc "Open the tests file."
task :open do
  system "open ./test/test.html"
end