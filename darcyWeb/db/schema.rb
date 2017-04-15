# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170415041048) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "buildings", force: :cascade do |t|
    t.string  "acronym"
    t.integer "phone"
  end

  create_table "locations", force: :cascade do |t|
    t.string   "title"
    t.string   "latitude"
    t.string   "longitude"
    t.string   "actable_type"
    t.integer  "actable_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["actable_type", "actable_id"], name: "index_locations_on_actable_type_and_actable_id", using: :btree
  end

end
