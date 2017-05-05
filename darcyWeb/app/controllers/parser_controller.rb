class ParserController < ApplicationController
  def index
    render plain: departaments
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
end
