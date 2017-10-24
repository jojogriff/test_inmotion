require File.join(File.dirname(__FILE__), '..', 'spec_helper')
require 'watir-webdriver'
#require 'pry'


class Page


  def initialize(browser)
    @browser = browser
  end

  def visit_my_url
      @browser.goto("http://localhost:9000/login")
   end
#binding.pr

    def login_valid_creds
      @browser.text_field(:name, "email").set "coolguyaaron@gmail.com"
      @browser.text_field(:name, "password").set "ASecretSoBigNoOneCanBreak"
      @browser.button(:text, "Submit").click
    end
    def goto_movies
      @browser.a(:text, /Movies/).wait_until_present
      @browser.a(:text, /Movies/).click
     end
   def enter_new_movie
     @browser.a(:text, /New Movie/).wait_until_present
     @browser.a(:text, /New Movie/).click
     @browser.text_field(:name, "posterImage").set "http://yahoo.com"
     @browser.text_field(:name, "title").set "my movie"
     @browser.text_field(:name, "year").set "1972"
     @browser.text_field(:name, "genre").set "comedy"
     @browser.text_field(:name, "rating").set "7"
     @browser.text_field(:name, "actors").set "Paul Newman"
     @browser.button(:text, "Submit").click
     @browser.alert.wait_until_present
     @browser.alert.ok
   end
   #validates that the movie we created shows up on the list
   def validate_movie_list
     @browser.a(:text, /Movies/).wait_until_present
     @browser.img(:src, /yahoo/).exists?
   def search_movie
     @browser.text_field(:name, "search").set "my movie"
   end
   def update_movie
     @browser.a(:href, /edit/).click
     @browser.text_field(:name, "actors").send_keys "Robert Redford"
     @browser.button(:text, "Submit").click
     @browser.alert.wait_until_present
     @browser.alert.ok
   end
   def see_movie_list
     @browser.a(:text, "Movie Collection").click
   end
   def delete_movie
     @browser.a(:href, "Delete").click
   end


end
end
