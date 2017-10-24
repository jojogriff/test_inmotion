require_relative ('../page_objects/page')
require File.join(File.dirname(__FILE__), '..', 'spec_helper')
require 'rspec'
require 'rspec/expectations'
require 'watir-webdriver'
#include RSpec::Matchers



describe "Submitting an application" do

    before (:all) do
      switches = ['--ignore-ssl-errors=yes']
      @browser = Watir::Browser.new :chrome
    #  @browser = Watir::Browser.new :phantomjs, :args => switches
      @browser.instance_variable_set :@speed, :slow
      @store = Page.new(@browser)
      #an example of an implicit wait
      @browser.driver.manage.timeouts.implicit_wait = 3
    end

after (:all) { @browser.close }

describe "Visit the movie app" do
    it "should go to localhost:9000/login" do
      @store.visit_my_url
    end
    it "should select the Login" do
       @store.login_valid_creds
       @store.goto_movies
    end

    it "should create a new movie and validate its fields" do
       @store.enter_new_movie
    end
    it "should validate the new movie" do
       @store.validate_movie_list
    end
    it "should search for a new movie" do
       @store.search_movie
    end
    it "should update the new movie" do
       @store.update_movie
    end

    it "should see the movie list" do
       @store.see_movie_list
    end
    it "should delete the movie" do
       @store.delete_movie
    end

end
end
