FactoryGirl.define do

  factory :department do
    acronym "DA"
    title "Departamento de Administração"
    phone 302310312
    latitude 0.0
    longitude 0.0
    geo_data '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-47.867375314235694,-15.762756116441665],[-47.86702126264573,-15.762497981882012],[-47.866597473621376,-15.763055552119592],[-47.8669622540474,-15.763303360622453],[-47.867375314235694,-15.762756116441665]]]}}]}'
  end

  factory :point do
    description "Descricao"
    geo_data '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-47.867375314235694,-15.762756116441665],[-47.86702126264573,-15.762497981882012],[-47.866597473621376,-15.763055552119592],[-47.8669622540474,-15.763303360622453],[-47.867375314235694,-15.762756116441665]]]}}]}'
    latitude 0.0
    longitude 0.0
    title "Bicicletario"
    type_point "Bicicletario"

    factory :bike do
      title "Bicicletario"
      type_point "Bicicletario"
    end

    factory :snackbar do
      title "Lanchonete"
      type_point "Lanchonete"
    end

    factory :bathroom do
      title "Banheiro"
      type_point "Banheiro"
    end

    factory :busstop do
      title "Parada de Onibus"
      type_point "Parada de Onibus"
    end

    factory :entrance do
      title "Entrada de Edificio"
      type_point "Entrada de Edificio"
    end
  end


  factory :building do
    acronym "BSA"
    title "Bloco"
    phone 302310312
    latitude -15.762519
    longitude -47.868652
    geo_data '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-47.867375314235694,-15.762756116441665],[-47.86702126264573,-15.762497981882012],[-47.866597473621376,-15.763055552119592],[-47.8669622540474,-15.763303360622453],[-47.867375314235694,-15.762756116441665]]]}}]}'
    image_data '{"id":"6fdf0b2f6cbb6ce1ad45009a436bed30.png","storage":"cache","metadata":{"filename":"planta.png","size":1106728,"mime_type":"image/png"}}'

    factory :building_icc do
      acronym "ICC"
      title "Instituto Central de Ciencias"
      latitude -15.762153
      longitude -47.867865
    end

  end


  factory :admin do
    name "MDS"
    email "mds@mds.com"
    password "mds123"
    password_confirmation "mds123"
  end

  factory :plan do
    building
    level 0
    geo_data '{"bottomLeft":{"lat":-15.758891485086423,"lng":-47.86995258182288},"topLeft":{"lat":-15.758961828036115,"lng":-47.87022884935141},"topRight":{"lat":-15.75793152725953,"lng":-47.870516180992134}}'
    image_data '{"id":"6fdf0b2f6cbb6ce1ad45009a436bed30.png","storage":"cache","metadata":{"filename":"planta.png","size":1106728,"mime_type":"image/png"}}'
  end

  factory :room do
    acronym "Sala de Aula"
    building
    geo_data '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-47.867375314235694,-15.762756116441665],[-47.86702126264573,-15.762497981882012],[-47.866597473621376,-15.763055552119592],[-47.8669622540474,-15.763303360622453],[-47.867375314235694,-15.762756116441665]]]}}]}'
    latitude 0.0
    level 0
    longitude 0.0
    room_type :classroom
    title "Sala de Aula"
  end

  factory :schedule do
    room
    title "Calculo 1"
    code 1234
    day_of_week :monday
    start_time "08:00"
    end_time "10:00"
    classroom "A"
  end

end
