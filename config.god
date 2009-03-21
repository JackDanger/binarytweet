# binarytweet.com
God.watch do |w|
  dir = File.expand_path(File.dirname(__FILE__))
  port = 7337
  w.name = "binarytweet"
  w.interval = 30.seconds
  w.pid_file = File.join(dir, "rack.#{port}.pid")
  start = "cd #{dir}; jack #{dir}/web.js -p #{port}"
  stop    = "ps x | grep  binarytweet.com | grep -v grep| awk '{print $1}'| xargs sudo kill -9"
  w.start = start
  w.stop  = stop
  w.restart = "#{stop}; #{start}"
  w.uid = 'www'
  w.gid = 'www'
  w.start_if do |start|
    start.condition(:process_running) do |c|
      c.interval = 5.seconds
      c.running = false
    end
  end
end
