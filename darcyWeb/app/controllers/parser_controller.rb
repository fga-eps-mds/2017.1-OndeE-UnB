class ParserController < ApplicationController
  def index
    render plain: datas
  end

# Departments parser
  def departaments
    require 'nokogiri'
    require 'open-uri'
    html = open('https://matriculaweb.unb.br/graduacao/oferta_dep.aspx?cod=1')
    doc = Nokogiri::HTML(html, nil, Encoding::UTF_8.to_s)
    rows = doc.css('.FrameCinza tr')
    rows.shift
    departments_urls = []
    # Getting Department links
    rows.each_with_index do |row, index|
      department = row.at('td[3] a')
      departments_urls.push(department['href'])
      puts "Departamento: " + department
    end
    return departments_urls
  end

# Courses parser
  def courses
    require 'nokogiri'
    require 'open-uri'
    site = 'https://matriculaweb.unb.br/graduacao/'
    courses_urls = []

    departaments.each_with_index do |departament, index |
        if(index > 3)
          break
        end
      html = open(site+departament)
      url = site+departament
      puts "Departamento:" + url
      doc = Nokogiri::HTML(html, nil, Encoding::UTF_8.to_s)
      rows = doc.css('.FrameCinza tr')
      rows.shift

      #Getting Courses links
      rows.each_with_index do |row, index|
        if(index > 3)
          break
        end
        course = row.at('td[2] a')
        courses_urls.push(course['href'])
        puts "Cursos: " + course
      end
    end
    return courses_urls
  end

  #Data parser
  def datas
    require 'nokogiri'
    require 'open-uri'
    site = 'https://matriculaweb.unb.br/graduacao/' # oferta_dados
    datas_urls = []
    
    courses.each do |course|
      html = open(site+course)
      url = site+course
      puts "Curso: " + url
      doc = Nokogiri::HTML(html, nil, Encoding::UTF_8.to_s)
      rows = doc.css('td.padrao[width="200"] div')
      datas_urls = []
      puts "Horários"
      #Getting the time and places of courses
      rows.each_with_index do |row, index|
          day_of_week = row.at('b')
          start_time = row.at('font[color="black"] b')
          end_time = row.at('font[color="brown"]')
          room = row.at('i')
          if day_of_week.present? && start_time.present? && end_time.present? && room.present?
            puts "Dia: #{day_of_week.text}"
            puts "start_time: #{start_time.text}"
            puts "end_time: #{end_time.text}"
            puts "room: #{room.text}"
          end
          puts "#" * 10
          # puts row.content
      end
   end
    return datas_urls
 end

 def fill_rooms

 end
end
