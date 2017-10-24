This assumes a Mac OS will be running these tests. They may work on ubuntu, but I haven't tried it.

The following tests can be run using the "rake" command: e.g.

=> rake

Or you can cd to the spec directory and run the test individually:

=> rspec use_case_spec.rb -f documentation


Requirements:

- Ruby: ruby 2.3.0p0
- watir-webdriver
- rspec
- Chrome
- json_spec gem
NOTE: uploaded Gemfile to bundle exec rake, i.e.

=> bundle exec rake

If you need to install rake:
http://bundler.io/man/bundle-exec.1.html


Here are my gems:

*** LOCAL GEMS ***

activesupport (5.0.0)
airborne (0.2.5)
bigdecimal (default: 1.2.8)
childprocess (0.5.9)
coderay (1.1.1)
concurrent-ruby (1.0.2)
did_you_mean (1.0.0)
diff-lcs (1.2.5)
domain_name (0.5.20160615)
executable-hooks (1.3.2)
ffi (1.9.10)
gem-wrappers (1.2.7)
json (default: 1.8.3)
json_spec (1.1.4)
mime-types (3.1, 2.99.2)
mime-types-data (3.2016.0521)
minitest (5.8.3)
multi_json (1.12.1)
multi_test (0.1.2)
multi_xml (0.5.5)
net-telnet (0.1.1)
netrc (0.11.0)
power_assert (0.2.6)
pry (0.10.3)
psych (default: 2.0.17)
rack (1.6.4)
rack-protection (1.5.3)
rack-test (0.6.3)
rake (10.4.2)
rdoc (default: 4.2.1)
rest-client (2.0.0, 1.8.0)
rspec (3.4.0)
rspec-core (3.4.4)
rspec-expectations (3.4.0)
rspec-mocks (3.4.1)
rspec-support (3.4.1)
rubygems-bundler (1.4.4)
rubygems-update (2.6.6)
rubyzip (1.2.0)
rvm (1.11.3.9)
selenium-webdriver (2.53.4)
test-unit (3.1.5)
thread_safe (0.3.5)
tilt (2.0.5)
tzinfo (1.2.2)
unf (0.1.4)
unf_ext (0.0.7.2)
watir-webdriver (0.9.1)
websocket (1.2.3)
yajl (0.3.4)
