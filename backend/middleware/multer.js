// The multer library is imported to handle file uploads in the application. It provides middleware for handling multipart/form-data, primarily used for uploading files

import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

export default upload;

// BRIEF EXPLANATION
// multer.diskStorage: Configures storage settings for uploaded files.
// filename: A function used to determine the name of the uploaded file saved on the disk.
// req: The HTTP request object.
// file: Information about the uploaded file, including its original name, mimetype, etc.
// callback: A function to specify the filename.
// Here, the file is saved with its original name (file.originalname)
