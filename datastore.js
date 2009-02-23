Ruby.require('rubygems')
Ruby.require('activerecord')

// define the root directory of the binarytweet.com app
var app_root = Ruby.File.expand_path('.')

Ruby.ActiveRecord.Base.establish_connection(
  Ruby.YAML.load(
    Ruby.IO.read(
      Ruby.File.join(app_root, 'database.yml')
    )
  )['production']
)
