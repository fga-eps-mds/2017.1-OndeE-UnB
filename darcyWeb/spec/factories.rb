FactoryGirl.define do
  factory :department do
    acronym "DA"
    title "Departamento de Administração"
    phone 302310312
    latitude 0.0
    longitude 0.0
    geo_data '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-47.867375314235694,-15.762756116441665],[-47.86702126264573,-15.762497981882012],[-47.866597473621376,-15.763055552119592],[-47.8669622540474,-15.763303360622453],[-47.867375314235694,-15.762756116441665]]]}}]}'
  end

  factory :building do
    acronym "BSA"
    title "Bloco"
    phone 302310312
    latitude 0.0
    longitude 0.0
    geo_data '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-47.867375314235694,-15.762756116441665],[-47.86702126264573,-15.762497981882012],[-47.866597473621376,-15.763055552119592],[-47.8669622540474,-15.763303360622453],[-47.867375314235694,-15.762756116441665]]]}}]}'
  end
end
