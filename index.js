const spsave = require("spsave").spsave;
const fs = require("fs");

const filePath = process.env.FILE_PATH
const glob = process.env.GLOB
const fileExtensionArr = filePath.split('.')
const fileExtension = `.${fileExtensionArr[fileExtensionArr.length - 1]}`
const sha = process.env.GITHUB_SHA.substring(0, 7)

const trimSlashes = (string) => {
    return string.replace(new RegExp('/', 'g'), '_')
}

if (process.env.CLIENTID != undefined) {
  let creds = {
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
  }
} else {
  let creds = {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
  }
}

let coreOptions = {
    siteUrl: process.env.SITE_URL,
}

if (process.env.filePath != undefined) {
  let fileOptions = {
      folder: process.env.LIB_FOLDER,
      fileName: `${trimSlashes(process.env.GITHUB_REPOSITORY)}_${sha}_${fileExtension}`,
      fileContent: fs.readFileSync(filePath),
  }
} else {
  let fileOptions = {
      folder: process.env.LIB_FOLDER,
      glob: process.env.GLOB,
      base: process.env.BASE,
  }
}

spsave(coreOptions, creds, fileOptions)
    .then(() => {
        console.log('Success')
    })
    .catch((_) => {
        process.exit(1)
    })
