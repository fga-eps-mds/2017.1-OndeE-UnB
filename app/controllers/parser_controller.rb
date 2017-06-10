class ParserController < ApplicationController
  def index
    render plain: schedules
  end

  def exclude_departments
    %(CDT FGA FCE FUP CET DAN CEN VIS CEL BOT)
  end

  def allowed_buildings
    %(ICC PAT PJC)
  end

  def replace_building_name(building)
    buildings = [ ['BSA N', 'BSAN'], ['BSA S', 'BSAS'] ]
    buildings.each do |replace|
      #building.gsub!(replace[0], replace[1])
    end
    building
  end

  def define_room_type(room)
    if room.include? "ANF"
      :amphitheater
    elsif room.include? "LAB"
      :laboratory
    else
      :classroom
    end
  end

  # Departments parser
  def departments
    require 'nokogiri'
    require 'open-uri'
    html = open('https://matriculaweb.unb.br/graduacao/oferta_dep.aspx?cod=1')
    html_tree = Nokogiri::HTML(html, nil, Encoding::UTF_8.to_s)
    departments_rows = html_tree.css('.FrameCinza tr')

    # Pop the first department row
    departments_rows.shift

    departments = []

    # Getting department data
    departments_rows.each_with_index do |department_row, _index|
      acronym = department_row.at('td[2]').text
      department = department_row.at('td[3] a')

      unless exclude_departments.include? acronym
        department_data = {
          acronym: acronym,
          title: department.text,
          url: "https://matriculaweb.unb.br/graduacao/#{department['href']}"
        }
        # puts department_data
        departments.push(department_data)
      end
    end

    departments
  end

  # Courses parser
  def courses
    require 'nokogiri'
    require 'open-uri'

    data = []
    departments.each_with_index do |department, _index|

      html = open(department[:url])
      html_tree = Nokogiri::HTML(html, nil, Encoding::UTF_8.to_s)

      courses_rows = html_tree.css('.FrameCinza tr')

      # Ignore the first course row
      courses_rows.shift

      courses = []

      # Getting courses data
      courses_rows.each_with_index do |courses_row, _index|
        course = courses_row.at('td[2] a')
        course_data = {
          title: course.text,
          url: "https://matriculaweb.unb.br/graduacao/#{course['href']}"
        }

        # puts course_data
        courses.push(course_data)
      end
      department[:courses] = courses

      data.push(department)
    end

    data
  end

  # Data parser
  def schedules
    require 'nokogiri'
    require 'open-uri'

    data = []

    courses.each do |department|
      department[:courses].each_with_index do |course, index|
        html = open(course[:url])
        html_tree = Nokogiri::HTML(html, nil, Encoding::UTF_8.to_s)
        schedules_rows = html_tree.css('td.padrao[width="200"] div')

        # Getting the time and places of courses
        schedules = []
        schedules_rows.each_with_index do |schedule_row, _index|

          day_of_week = schedule_row.at('b')
          start_time = schedule_row.at('font[color="black"] b')
          end_time = schedule_row.at('font[color="brown"]')
          room = schedule_row.at('i')

          if day_of_week.present? &&
            start_time.present? &&
            end_time.present? &&
            room.present?

            room = room.text.strip

            building = replace_building_name(room.split.first)

            if allowed_buildings.include? 'PAT'

              schedule_data = {
                day_of_week: day_of_week.text,
                start_time: start_time.text,
                end_time: end_time.text,
                building: building,
                room: room,
                room_type: define_room_type(room)
              }

              fill_rooms(schedule_data)

              puts schedule_data
              # schedules.push(schedule_data)
            end
          end
        end

        department[:courses][index][:schedules]  = schedules
      end
      data.push(department)
    end
    data
 end

  def fill_rooms(args)
    room = Room.where(acronym: args[:room]).first_or_create do |create_room|
        building = Building.where(acronym: args[:building]).first_or_create do |create_building|
          create_building.title = args[:building]
          create_building.acronym = args[:building]
          create_building.latitude = 0
          create_building.longitude = 0
          create_building.phone = 0
          create_building.geo_data = "[]"
        end
        create_room.building = building
        create_room.title = args[:room]
        create_room.room_type = args[:room_type]
        create_room.level = 0
        create_room.latitude = 0
        create_room.longitude = 0
        create_room.geo_data = "[]"
    end
    puts room.errors.messages
  end
end
