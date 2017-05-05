class ParserController < ApplicationController
  def get_html
  # require 'rubygems'
  # require 'nokogiri'
  # require 'open-uri'
  # doc = Nokogiri::HTML(open('https://matriculaweb.unb.br/graduacao/oferta_dep.aspx?cod=1'))
  # doc.xpath('//div[@class='padrao']')
  # puts el.text
 end
 def get_departaments
   require 'rubygems'
   require 'nokogiri'
   require 'open-uri'
   doc = Nokogiri::HTML(open('https://matriculaweb.unb.br/graduacao/oferta_dep.aspx?cod=1'))
   doc.css('.FrameCinza tr').each do |row|
     department = row.at('td[3]')
     puts department.text
     puts department['href']
     puts department
   end
   render plain: ''
 end
 def save
 end
end
