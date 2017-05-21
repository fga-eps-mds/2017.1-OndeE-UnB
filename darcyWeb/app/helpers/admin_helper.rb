module AdminHelper
  def alert_success(message)
    "<div class='alert alert-success'>#{message}</div>"
  end

  def alert_danger(message)
    "<div class='alert alert-danger'>#{message}</div>"
  end
end
