# binarytweet.com
God.watch do |w|
  dir = File.expand_path(File.dirname(__FILE__))
  port = 7337
  w.name = "binarytweet"
  w.interval = 30.seconds
  w.pid_file = File.join(dir, "rack.#{port}.pid")
  w.start = "cd #{dir}; jack web.js -p #{port}"
  w.stop    = "kill -9 `cat #{w.pid_file}`"
  w.restart = "kill -9 `cat #{w.pid_file}`; cd #{dir}; jack web.js -p #{port}"
  w.uid = 'www'
  w.gid = 'www'
  w.start_if do |start|
    start.condition(:process_running) do |c|
      c.interval = 5.seconds
      c.running = false
    end
  end
end
