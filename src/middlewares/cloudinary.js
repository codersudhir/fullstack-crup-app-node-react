const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: "dhqpgwpgq",
  api_key: "931122266428593",
  api_secret: "rUE4CKJVhCudoUQyHG5B_X6nyYY"
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
      chunk_size: 2000000 ,
      max_file_size: 50000000
    });
   // fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    //fs.unlinkSync(localFilePath);
    return null;
  }
};

module.exports = {
  uploadOnCloudinary: uploadOnCloudinary
};
