
task :default => :test

task :test do
  tests = Dir["test/*_test.js"].map
  required = [

    File.join(File.dirname(__FILE__), 'test'),
    '/www/projects/taka/lib/',
    '/www/projects/johnson/',

    ].map {|dir| " -I #{dir}" }

  cmd = "ruby #{required.join} `which johnson` #{tests.join}"
  puts cmd
  system cmd
end