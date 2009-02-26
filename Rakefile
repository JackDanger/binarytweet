
$:.unshift ''

task :default => :test

task :test do
  tests = Dir["test/*_test.js"].map
  required = %w(test /www/projects/johnson/lib/ /www/projects/taka/lib/).map {|dir| " -I #{dir}" }
  cmd = "ruby #{required.join} /www/projects/johnson/bin/johnson #{tests.join}"
  puts cmd
  system cmd
end