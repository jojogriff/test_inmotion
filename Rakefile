require 'rspec/core/rake_task'
require File.join(File.dirname(__FILE__), 'spec_helper.rb')





# runs all the spec files, raises error if any test fails
task :cleanup do
	if !Dir.pwd.include? 'api'
    FileUtils.cd('api')
		FileUtils.rm('temp.json')
	end
end
task :spec do
	if !Dir.pwd.include? 'spec'
    FileUtils.cd('spec')
  end
	Dir.glob('*_spec.rb') do |spec_file|
		sh %{rspec #{spec_file} -f documentation} do |ok, res|
			raise "test failed" if !ok
		end
	end
end

task :api do

	if !Dir.pwd.include? 'api'
  #  FileUtils.cd('../api')
	  FileUtils.cd('api')
  end
	Dir.glob('*.rb') do |api_file|
		 sh %{ruby #{api_file}} do |ok, res|
			raise "test failed" if !ok
		end
	end
end




#task :default => :spec
#task :default => :cleanup
task :default => :api
