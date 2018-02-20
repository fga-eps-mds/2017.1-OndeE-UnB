class GetCourses
  include Interactor

  def call
    require 'nokogiri'
    require 'open-uri'

    courses = []
    departments.each do |department|
      html = open(department[:url])
      html_tree = Nokogiri::HTML(html, nil, Encoding::UTF_8.to_s)

      courses_rows = html_tree.css('tbody tr')

      # Ignore the first course row
      courses_rows.shift

      # Getting courses data
      courses_rows.each do |courses_row|
        course = courses_row.at('td[2] a')
        course_data = {
          department: department,
          title: course.text,
          url: "https://matriculaweb.unb.br/graduacao/#{course['href']}"
        }

        puts course_data
        # puts in the courses list course_data
        courses.push(course_data)
      end
    end

    courses
  end
end
