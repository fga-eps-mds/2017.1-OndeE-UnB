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