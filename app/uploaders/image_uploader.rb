class ImageUploader < Shrine
  plugin :validation_helpers
  plugin :determine_mime_type


 Attacher.validate do
    validate_extension_inclusion ['png', 'jpeg']
    validate_mime_type_inclusion ['image/png', 'image/jpeg']
  end
end
