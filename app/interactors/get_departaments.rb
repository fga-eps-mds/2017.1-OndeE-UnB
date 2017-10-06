class GetDepartaments
  include Interactor

  # Gets department data from the matriculaweb url.
  # return an array of hash with department data.
  def call
    require 'nokogiri'
    require 'open-uri'
    html = open('https://matriculaweb.unb.br/graduacao/oferta_dep.aspx?cod=1')
    html_tree = Nokogiri::HTML(html, nil, Encoding::UTF_8.to_s)
    departments_rows = html_tree.css('tbody tr')
    departments = []

    departments_rows.each do |department_row|
      acronym = department_row.at('td[2]').text
      department = department_row.at('td[3] a')

      # Adds the department only if its not in the exclude list.
      next if %w(FGA FCE FUP).include? acronym
      department_data = {
        acronym: acronym,
        title: department.text,
        url: "https://matriculaweb.unb.br/graduacao/#{department['href']}"
      }
      puts department_data
      departments.push(department_data)
    end

    departments
    end
  end
