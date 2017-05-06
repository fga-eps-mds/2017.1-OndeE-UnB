class ParserController < ApplicationController
  def index
    render plain: datas
  end

  def departaments
    require 'nokogiri'
    require 'open-uri'
    html = open('https://matriculaweb.unb.br/graduacao/oferta_dep.aspx?cod=1')
    doc = Nokogiri::HTML(html, 'utf-8')
    rows = doc.css('.FrameCinza tr')
    rows.shift
    departments_urls = []
    rows.each_with_index do |row, index|
      department = row.at('td[3] a')
      departments_urls.push(department['href'])
    end
    return departments_urls
  end

  def courses
    require 'nokogiri'
    require 'open-uri'
    site = 'https://matriculaweb.unb.br/graduacao/'
    courses_urls = []
    departaments.each do |departament|
      #departament courses
      html = open(site+departament)
      url = site+departament
      puts url
      doc = Nokogiri::HTML(html, 'utf-8')
      rows = doc.css('.FrameCinza tr')
      rows.shift

      rows.each_with_index do |row, index|
        course = row.at('td[2] a')
        courses_urls.push(course['href'])
      end
    end
    return courses_urls
  end
  def datas
    require 'nokogiri'
    require 'open-uri'
    site = 'https://matriculaweb.unb.br/graduacao/'
    datas_urls = []
    puts 'estou aqui'
    datas.each do |datas|
      html = open(site+departament+courses)
      url = site+departament+courses
      puts url
      doc = Nokogiri::HTML(html, 'utf-8')
      rows = doc.css('.FrameCinza tr')
      rows.shift
      rows.each_with_index do |row, index|
        data = row.at('td[4] a')
        datas_urls.push(data['href'])
      end
    end
    return datas_urls
  end
end
