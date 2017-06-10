class ParserController < ApplicationController
  def index
    render plain: schedules
  end

  def geo_data
    '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-47.867375314235694,-15.762756116441665],[-47.86702126264573,-15.762497981882012],[-47.866597473621376,-15.763055552119592],[-47.8669622540474,-15.763303360622453],[-47.867375314235694,-15.762756116441665]]]}}]}'
  end

  def exclude_departments
    %w(CDT FGA FCE FUP CET DAN CEN VIS CEL BOT)
  end

  def allowed_buildings
    %w(ICC PAT PJC)
  end

  def replace_building_name(building)
    buildings = [ ['BSA N', 'BSAN'], ['BSA S', 'BSAS'] ]
    buildings.each do |replace|
      building.gsub(replace[0], replace[1])
    end
    building
  end

  def clean_room_name(room_name)
    room_name.gsub('.', '')
    room_name
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

  def valid_schedule_and_room?(day_of_week, start_time, end_time, room)
    valid_times = day_of_week.present? && start_time.present? && end_time.present?
    valid_room = room.present? && (room != "Local a Designar")
    valid_times && valid_room
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

    courses = []
    departments.each_with_index do |department, _index|

      html = open(department[:url])
      html_tree = Nokogiri::HTML(html, nil, Encoding::UTF_8.to_s)

      courses_rows = html_tree.css('.FrameCinza tr')

      # Ignore the first course row
      courses_rows.shift

      # Getting courses data
      courses_rows.each_with_index do |courses_row, _index|
        course = courses_row.at('td[2] a')
        course_data = {
          department: department,
          title: course.text,
          url: "https://matriculaweb.unb.br/graduacao/#{course['href']}"
        }

        # puts in the courses list course_data
        courses.push(course_data)
      end
    end

    courses
  end

  # Data parser
  def schedules
    require 'nokogiri'
    require 'open-uri'

    courses.each_with_index do |course, index|
      html = open(course[:url])
      html_tree = Nokogiri::HTML(html, nil, Encoding::UTF_8.to_s)
      schedules_rows = html_tree.css('td.padrao[width="200"] div')

      # Getting the time and places of courses
      schedules_rows.each_with_index do |schedule_row, _index|

        day_of_week = schedule_row.at('b')
        start_time = schedule_row.at('font[color="black"] b')
        end_time = schedule_row.at('font[color="brown"]')
        room = schedule_row.at('i')

        if valid_schedule_and_room?(day_of_week, start_time, end_time, room)
          room = clean_room_name(room.text.strip)

          building = replace_building_name(room.split.first)

          if allowed_buildings.include? building

            schedule_data = {
              course: course,
              day_of_week: day_of_week.text,
              start_time: start_time.text,
              end_time: end_time.text,
              building: building,
              room: room,
              room_type: define_room_type(room)
            }

            create_schedules(schedule_data)

            puts schedule_data
            # schedules.push(schedule_data)
          end
        end
      end
    end
 end

  def create_schedules(params)
    room = create_room(params)
  end

  def create_room(params)
    Room.where(acronym: params[:room]).first_or_create do |room|
       room.building = create_building(params)
       room.title = params[:room]
       room.room_type = params[:room_type]
       room.level = 0
       room.latitude = 0
       room.longitude = 0
       room.geo_data = geo_data
   end
  end

  def create_building(params)
    Building.where(acronym: params[:building]).first_or_create do |building|
      building.title = params[:building]
      building.acronym = params[:building]
      building.latitude = 0
      building.longitude = 0
      building.phone = 0
      building.geo_data = geo_data
    end
  end
end
