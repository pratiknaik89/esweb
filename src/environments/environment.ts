// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// export const environment = {
//   production: false,
//   api_root: "http://localhost:8000/api",
//   upload_folder: "uploaddoc",
//   directUpload: "directUpload",
//   document_path: "http://localhost:8000/documents",
//   server_type: "uat",
//   "cloudinary_url": "https://res.cloudinary.com/djuzgpzo8/image/upload/"
// };
export const environment = {

  production: true,
  "api_root": "http://localhost:8000/api",
  "upload_folder": "uploaddoc",
  "directUpload": "upload",
  "document_path": "http://localhost:8000/documents",
  "cloudinary_url": "https://res.cloudinary.com/djuzgpzo8/image/upload/"
};
