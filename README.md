# action-sharepoint-publish-glob

A simple Github Action that create an archive of a repository and upload it to a Sharepoint library

## Inputs

```yml
  site_url:
    description: 'The Sharepoint site url'
    required: true
  sharepoint_client_id:
    description: 'Client ID to use for authentication'
    required: false
  sharepoint_client_secret:
    description: 'Client Secret to use for authentication'
    required: false
  sharepoint_username:
    description: 'Username to use for authentication'
    required: false
  sharepoint_password:
    description: 'Password to use for authentication'
    required: false
  library_folder:
    description: 'The path where to upload the files in the library'
    required: true
    default: "Shared documents"
  glob:
    description: "Filenames to upload to SharePoint. string or string array, 
      i.e. 'build/css/style.css' or ['build/css/*.*']."
    required: false
  base:
    description: "Base directory, if you want to preserve folders structure 
      inside SharePoint folder, you can provide a base for you files. For example 
      when using glob ['build/css/*.*'] and base: 'build', all css files will 
      be loaded under [SharePoint folder]/css"
    required: false
  file_path:
    description: 'To upload a specific file instead of the whole repo, specify the path here'
    required: false
```

> :bulb: Tip : It is recommended to use GitHub Actions Secrets to store sensitive informations like client secrets and id

## Example usage

This action is particularly useful when triggered by push:

```yml
name: 'Sharepoint Sync'

on: push

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:  
    
    - name: Cloning repo
      uses: actions/checkout@v2

    - name: Publish to Sharepoint
      uses: skysyzygy/action-sharepoint-publish-glob
      with:
       site_url: 'https://your.sharepoint.com/sites/mySite'
       library_folder: 'Shared documents/releases'
       sharepoint_client_id: ${{ secrets.CLIENTID }}
       sharepoint_client_secret: ${{ secrets.CLIENTSECRET }}
```

Or with username/password authentication...

```yml
name: 'Sharepoint Sync'

on: push

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:  
    
    - name: Cloning repo
      uses: actions/checkout@v2

    - name: Publish to Sharepoint
      uses: skysyzygy/action-sharepoint-publish-glob
      with:
       site_url: 'https://your.sharepoint.com/sites/mySite'
       library_folder: 'Shared documents/releases'
       sharepoint_username: ${{ secrets.USERNAME }}
       sharepoint_password: ${{ secrets.PASSWORD }}
```

And with globbed files...

```yml
name: 'Sharepoint Sync'

on: push

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:  
    
    - name: Cloning repo
      uses: actions/checkout@v2

    - name: Publish to Sharepoint
      uses: skysyzygy/action-sharepoint-publish-glob
      with:
       site_url: 'https://your.sharepoint.com/sites/mySite'
       library_folder: 'Shared documents/releases'
       glob: docs/*
       sharepoint_username: ${{ secrets.USERNAME }}
       sharepoint_password: ${{ secrets.PASSWORD }}
```
