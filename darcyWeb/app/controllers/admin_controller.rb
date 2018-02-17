class AdminController < ApplicationController
  before_action :authenticate_admin!
  layout 'admin'
  def index
  end

  private

  def authenticate_admin
    admin_signed_in?
  end
end
