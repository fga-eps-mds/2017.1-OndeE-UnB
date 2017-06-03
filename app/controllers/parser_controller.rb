class ParserController < ApplicationController
  def index
    render plain: datas
  end

# Departments parser
  def departaments
    require 'nokogiri'
    require 'open-uri'
    html = open('https://matriculaweb.unb.br/graduacao/oferta_dep.aspx?cod=1')
    doc = Nokogiri::HTML(html, 'utf-8')
    rows = doc.css('.FrameCinza tr')
    rows.shift
    departments_urls = []
    # Getting Department links
    rows.each_with_index do |row, index|
      department = row.at('td[3] a')
      departments_urls.push(department['href'])
      puts "Departamento: " + department['href']
    end
    return departments_urls
  end

# Courses parser
  def courses
    require 'nokogiri'
    require 'open-uri'
    site = 'https://matriculaweb.unb.br/graduacao/'
    courses_urls = []

    departaments.each do |departament|
      html = open(site+departament)
      url = site+departament
      puts "Departamento:" + url
      doc = Nokogiri::HTML(html, 'utf-8')
      rows = doc.css('.FrameCinza tr')
      rows.shift

      #Getting Courses links
      rows.each_with_index do |row, index|
        course = row.at('td[2] a')
        courses_urls.push(course['href'])
        puts "Cursos: " + course['href']
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
      doc = Nokogiri::HTML(html, 'utf-8')
      rows = doc.css('div')
      rows.shift
      datas_urls = []
      #Getting the time and places of courses
      rows.each_with_index do |row, index|
          puts row.text
      end
   end
    return datas_urls
 end
end
