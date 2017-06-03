# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

admin = Admin.create(name: "admin", email:"admin@admin.com", password:"123456")

bikes = Point.create([
    {title:"Bicicletario1",latitude:"-15.761300233230024",longitude:"-47.86743164062501",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86743164062501,-15.761300233230024]}}]}","type_point":"Bicicletario","description":"Bicicletario1"},
    {title:"Bicicletario2",latitude:"-15.76578142901036",longitude:"-47.86686301231385",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86686301231385,-15.76578142901036]}}]}","type_point":"Bicicletario","description":"Bicicletario2"},
    {title:"Bicicletario3",latitude:"-15.762518632658859",longitude:"-47.87046790122986",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.87046790122986,-15.762518632658859]}}]}","type_point":"Bicicletario","description":"Bicicletario3"},
    {title:"Bicicletario4",latitude:"-15.76495540957626",longitude:"-47.868971228599555",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.868971228599555,-15.76495540957626]}}]}","type_point":"Bicicletario","description":"Bicicletario4"},
    {title:"Bicicletario5",latitude:"-15.763860928647702",longitude:"-47.87036061286927",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.87036061286927,-15.763860928647702]}}]}","type_point":"Bicicletario","description":"Bicicletario5"},
    {title:"Bicicletario6",latitude:"-15.76417068799988",longitude:"-47.87086486816407",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.87086486816407,-15.76417068799988]}}]}","type_point":"Bicicletario","description":"Bicicletario6"},
    {title:"Bicicletario7",latitude:"-15.765523298298364",longitude:"-47.870306968688965",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.870306968688965,-15.765523298298364]}}]}","type_point":"Bicicletario","description":"Bicicletario7"},
    {title:"Bicicletario8",latitude:"-15.763966763146204",longitude:"-47.8720584511757",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.8720584511757,-15.763966763146204]}}]}","type_point":"Bicicletario","description":"Bicicletario8"},
    {title:"Bicicletario9",latitude:"-15.76415520004351",longitude:"-47.87233471870423",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.87233471870423,-15.76415520004351]}}]}","type_point":"Bicicletario","description":"Bicicletario9"},
    {title:"Bicicletario10",latitude:"-15.763530518150958",longitude:"-47.873193025588996",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.873193025588996,-15.763530518150958]}}]}","type_point":"Bicicletario","description":"Bicicletario10"},
])

busstops = Point.create([
  {title:"Ponto do posto",latitude:"-15.761475765802015",longitude:"-47.87438929080964", geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.87438929080964,-15.761475765802015]}}]}","type_point":"Parada de Onibus","description":"ponto do posto"},
  {title:"Ponto de onibus",latitude:"-15.761570759844384",longitude:"-47.86606371402741", geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86606371402741,-15.761570759844384]}}]}","type_point":"Parada de Onibus","description":"potdeinubs"},
  {title:"Ponto de onibus",latitude:"-15.7677948372954",longitude:"-47.8727799654007", geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.8727799654007,-15.7677948372954]}}]}","type_point":"Parada de Onibus","description":"icc sul"},
  {title:"ponto de onibuss",latitude:"-15.757231965217958",longitude:"-47.86800563335419", geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86800563335419,-15.757231965217958]}}]}","type_point":"Parada de Onibus","description":"longe"},
  {title:"pondionibus",latitude:"-15.760236709107037",longitude:"-47.87162125110627", geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.87162125110627,-15.760236709107037]}}]}","type_point":"Parada de Onibus","description":"parada"},
  {title:"punto del bus",latitude:"-15.76008182648842",longitude:"-47.8703659772873", geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.8703659772873,-15.76008182648842]}}]}","type_point":"Parada de Onibus","description":"el parada"},
])

entrances = Point.create([
  {title:"Entrada ICC Ceubinho",latitude:"-15.76263221189401",longitude:"-47.87034451961518",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.87034451961518,-15.76263221189401]}}]}","type_point":"Entrada de Edificio","description":"Ceubinho"},
  {title:"entrada",latitude:"-15.760515497522757",longitude:"-47.870752215385444",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.870752215385444,-15.760515497522757]}}]}","type_point":"Entrada de Edificio","description":"por ali"},
  {title:"mais uma entrada",latitude:"-15.760432893587641",longitude:"-47.87046253681183",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.87046253681183,-15.760432893587641]}}]}","type_point":"Entrada de Edificio","description":"aqui vei"},
  {title:"entra aqui",latitude:"-15.76245668032201",longitude:"-47.86969006061555",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86969006061555,-15.76245668032201]}}]}","type_point":"Entrada de Edificio","description":"aqui ó"},
  {title:"entra por ali",latitude:"-15.764676627258451",longitude:"-47.86887466907501",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86887466907501,-15.764676627258451]}}]}","type_point":"Entrada de Edificio","description":"ali"},
  {title:"entradinha",latitude:"-15.76416036269576",longitude:"-47.868456244468696",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.868456244468696,-15.76416036269576]}}]}","type_point":"Entrada de Edificio","description":"entrouuu"},
  {title:"entrou?",latitude:"-15.765750453342257",longitude:"-47.86704003810883",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86704003810883,-15.765750453342257]}}]}","type_point":"Entrada de Edificio","description":"sinhe"}
])

snackbars = Point.create([
  {"title":"RU","latitude":"-15.76306587747993","longitude":"-47.87118136882783","geo_data":"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.87118136882783,-15.76306587747993]}}]}","type_point":"Lanchonete","description":"RU"},
  {"title":"ceubinho top","latitude":"-15.762518632658859","longitude":"-47.87006556987763","geo_data":"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.87006556987763,-15.762518632658859]}}]}","type_point":"Lanchonete","description":"comida"},
  {"title":"mais comida","latitude":"-15.760649728845639","longitude":"-47.870730757713325","geo_data":"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.870730757713325,-15.760649728845639]}}]}","type_point":"Lanchonete","description":"comidinha"},
  {"title":"comidaa","latitude":"-15.764428820432249","longitude":"-47.86863863468171","geo_data":"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86863863468171,-15.764428820432249]}}]}","type_point":"Lanchonete","description":"tem coisa pra comer"}
])

bathrooms = Point.create([
  {"title":"Banheirooo","latitude":"-15.761713250804895","longitude":"-47.870087027549744","geo_data":"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.870087027549744,-15.761713250804895]}}]}","type_point":"Banheiro","description":"Banheirinho"},
  {"title":"banheirim","latitude":"-15.7609491676307","longitude":"-47.86801636219025","geo_data":"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86801636219025,-15.7609491676307]}}]}","type_point":"Banheiro","description":"seruga ae"},
  {"title":"banheiro, nao sei se funciona","latitude":"-15.76360279549309","longitude":"-47.86974370479584","geo_data":"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86974370479584,-15.76360279549309]}}]}","type_point":"Banheiro","description":"guenta "}
])
