FactoryGirl.define do
  factory :department do
    acronym "MyString"
    phone 1
  end
  factory :building do
    acronym "ICC"
    title "Instituto Central"
    phone 1100000000
    latitude 0.0
    longitude 0.0
    geo_data '.'
  end
end
