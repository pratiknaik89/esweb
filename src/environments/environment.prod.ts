// export const environment = {
//   production: true,
//   api_root: "http://34.225.212.119/Stork/StorkPHP/public/index.php/api",
//   upload_folder: "uploaddoc",
//   directUpload: "directUpload",
//   document_path: "http://34.225.212.119/Stork/StorkPHP/documents",
//   server_type: "uat"
// };


export const environment = {
  production: true,
  api_root: "http://ec2-54-174-155-193.compute-1.amazonaws.com:80/ELEVATEPHP/public/index1.php/api",
  upload_folder: "uploaddoc",
  directUpload: "upload",
  document_path: "http://ec2-54-174-155-193.compute-1.amazonaws.com:80/ELEVATEPHP/public/upload/",
  cloudinary_url: "https://res.cloudinary.com/djuzgpzo8/image/upload/",
  maxfileuploadsize: 5000000,
  AWS_BUCKET_PREFIX:"elevate-stage-"
};