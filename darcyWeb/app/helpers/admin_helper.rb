module AdminHelper
  def alert_success(message)
    "<div class='alert alert-success'>#{message}</div>"
  end

  def alert_danger(message)
    "<div class='alert alert-danger'>#{message}</div>"
  end

  def options_for_levels_with_plans(plans, building, selected_level)
    options = []
    plans.each do |plan|
      display = "#{plan.building.acronym} - Nível #{plan.level}"
      selected = false

      if plan.building == building && plan.level == selected_level
        selected = true
      end

      options.push([display, plan.building.id, { data: { selected: selected, level: plan.level, image: plan.image_url, geo_data: plan.geo_data } }])
    end

    options_for_select(options).html_safe
  end
end
