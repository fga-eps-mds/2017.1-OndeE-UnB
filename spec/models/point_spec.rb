require 'rails_helper'

describe Point do
    it "is valid when it contains all fields inserted description" do
        allfields = FactoryGirl.build :point, title:"Bicicletario1",latitude:"-15.761300233230024",longitude:"-47.86743164062501",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86743164062501,-15.761300233230024]}}]}","type_point":"Bicicletario","description":"Bicicletario1"
        expect(allfields).to be_valid
    end

    it "is invalid when if type point is empty" do
        typempt = FactoryGirl.build :point, title:"Bicicletario2",latitude:"-15.761300233230024",longitude:"-47.86743164062501",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86743164062501,-15.761300233230024]}}]}","description":"Bicicletario1"
        expect(typempt).to be_invalid
    end

    it "is invalid when if type point is null" do
        typnul = FactoryGirl.build :point, title:"Bicicletario3",latitude:"-15.761300233230024",longitude:"-47.86743164062501",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86743164062501,-15.761300233230024]}}]}","type_point":"","description":"Bicicletario1"
        expect(typnul).to be_invalid
    end

    it "is invalid when if description of point is empty" do
        empt = FactoryGirl.build :point, title:"Bicicletario4",latitude:"-15.761300233230024",longitude:"-47.86743164062501",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86743164062501,-15.761300233230024]}}]}","type_point":"Bicicletario","description":""
        expect(empt).to be_invalid
    end

    it "is invalid when if description of point is null" do
        nul = FactoryGirl.build :point, title:"Bicicletario5",latitude:"-15.761300233230024",longitude:"-47.86743164062501",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86743164062501,-15.761300233230024]}}]}","type_point":"Bicicletario"
        expect(nul).to be_invalid
    end

    it "is invalid when geo_data is blank" do
        icc = FactoryGirl.build :point, title:"Bicicletario3",latitude:"-15.761300233230024",longitude:"-47.86743164062501",geo_data:"","type_point":"","description":"Bicicletario1"
        expect(icc).to be_invalid
    end

    it "is invalid when geo_data is null" do
        icc = FactoryGirl.build :point, title:"Bicicletario3",latitude:"-15.761300233230024",longitude:"-47.86743164062501","type_point":"","description":"Bicicletario1"
        expect(icc).to be_invalid
    end

    it "is invalid when latitude is blank" do
        icc = FactoryGirl.build :point, title:"Bicicletario1",latitude:"",longitude:"-47.86743164062501",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86743164062501,-15.761300233230024]}}]}","type_point":"Bicicletario","description":"Bicicletario1"
        expect(icc).to be_invalid
    end

    it "is invalid when latitude is null" do
        icc = FactoryGirl.build :point, title:"Bicicletario1",longitude:"-47.86743164062501",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86743164062501,-15.761300233230024]}}]}","type_point":"Bicicletario","description":"Bicicletario1"
        expect(icc).to be_invalid
    end

    it "is invalid when longitude is blank" do
        icc = FactoryGirl.build :point, title:"Bicicletario1",latitude:"-15.761300233230024",longitude:"",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86743164062501,-15.761300233230024]}}]}","type_point":"Bicicletario","description":"Bicicletario1"
        expect(icc).to be_invalid
    end

    it "is invalid when longitude is blank" do
        icc = FactoryGirl.build :point, title:"Bicicletario1",latitude:"-15.761300233230024",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86743164062501,-15.761300233230024]}}]}","type_point":"Bicicletario","description":"Bicicletario1"
        expect(icc).to be_invalid
    end

    it "is invalid when title is blank" do
        icc = FactoryGirl.build :point, title:"",latitude:"-15.761300233230024",longitude:"-47.86743164062501",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86743164062501,-15.761300233230024]}}]}","type_point":"Bicicletario","description":"Bicicletario1"
        expect(icc).to be_invalid
    end

    it "is invalid when title is null" do
        icc = FactoryGirl.build :point,latitude:"-15.761300233230024",longitude:"-47.86743164062501",geo_data:"{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[-47.86743164062501,-15.761300233230024]}}]}","type_point":"Bicicletario","description":"Bicicletario1"
        expect(icc).to be_invalid
    end

end