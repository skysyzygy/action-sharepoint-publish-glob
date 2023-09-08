const spsave = require("spsave").spsave;
const fs = require("fs");

const filePath = process.env.INPUT_FILE_PATH
const glob = process.env.INPUT_GLOB
const fileExtensionArr = filePath.split('.')
const fileExtension = `.${fileExtensionArr[fileExtensionArr.length - 1]}`
const sha = process.env.GITHUB_SHA.substring(0, 7)

const trimSlashes = (string) => {
    return string.replace(new RegExp('/', 'g'), '_')
}

console.log("Starting node...")

let creds = {}
if (process.env.INPUT_CLIENTID != "") {
  creds = {
      clientId: process.env.INPUT_CLIENTID,
      clientSecret: process.env.INPUT_CLIENTSECRET,
  }
} else {
  creds = {
      username: process.env.INPUT_USERNAME,
      password: process.env.INPUT_PASSWORD,
  }
}

let coreOptions = {
    siteUrl: process.env.INPUT_SITE_URL,
}
console.log(coreOptions)

let fileOptions = {}
if (filePath != "") {
  fileOptions = {
      folder: process.env.INPUT_LIBRARY_FOLDER,
      fileName: `${trimSlashes(process.env.GITHUB_REPOSITORY)}_${sha}_${fileExtension}`,
      fileContent: fs.readFileSync(filePath),
  }
} else {
  fileOptions = {
      folder: process.env.INPUT_LIBRARY_FOLDER,
      glob: process.env.INPUT_GLOB,
      base: process.env.INPUT_BASE,
  }
}
console.log(fileOptions)

spsave(coreOptions, creds, fileOptions)
    .then(() => {
        console.log('Success')
    })
    .catch((_) => {
        console.log(_)
        process.exit(1)
    })
