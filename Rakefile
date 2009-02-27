
task :default => :test

desc "Run the jspec test suite"
task :test do

  # FIXME: why is it so hard to add Johnson to the load path?
  johnson_path = `gem which johnson | tail -n 1`.chomp.sub(/lib\/johnson\.rb$/, '')

  tests = Dir["test/*_test.js"].map
  required = [
    " -I #{File.dirname(__FILE__)}",
    " -I #{File.join(File.dirname(__FILE__), 'test')}",
    " -I #{johnson_path}",
    " -r rubygems"
    ]

  cmd = "ruby #{required.join} `which johnson` #{tests.join}"
  puts cmd
  system cmd
end

desc "Retrieve @binarial replies from twitter api and store new ones"
task :retrieve do

  cmd = "johnson -r scrape.js -e 'Scrape.run()'"
  puts cmd
  system cmd
end