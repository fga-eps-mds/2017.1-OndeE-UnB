require "shrine"
require "shrine/storage/s3"
require "shrine/storage/file_system"

s3_options = {
access_key_id:     ENV['AWS_ACCESS_KEY_ID'],
secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
region:            "us-west-2",
bucket:            ENV['AWS_S3_BUCKET'],
}

if %w(test development).include? Rails.env
 Shrine.storages = {
  cache: Shrine::Storage::FileSystem.new("public", prefix: "uploads/cache"), # temporary
  store: Shrine::Storage::FileSystem.new("public", prefix: "uploads/store") # permanent
 }
else
 Shrine.storages = {
  cache: Shrine::Storage::S3.new(prefix: "cache", **s3_options),
  store: Shrine::Storage::S3.new(prefix: "store", **s3_options),
 }
end

Shrine.plugin :activerecord
Shrine.plugin :cached_attachment_data
