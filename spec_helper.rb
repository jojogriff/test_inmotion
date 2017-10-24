require 'rspec'
require 'watir-webdriver'
require 'json_spec'
require 'yajl'



#require File.join(File.dirname(__FILE__), 'store_helper')
Dir[File.join(File.dirname(__FILE__), 'page_objects', '*.rb')].each do |file|
  require file
end

  RSpec.configure do |config|
    config.filter_run focus: true
    config.filter_run_excluding ignore: true
    config.run_all_when_everything_filtered = true
    config.include JsonSpec::Helpers
  end
