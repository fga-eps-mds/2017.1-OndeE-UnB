class HomeController < ActionController::Base
    protect_from_forgery with: :exception
    def home
        render html: "hello, world!"
    end
end
