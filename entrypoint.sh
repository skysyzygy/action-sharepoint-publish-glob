#!/bin/sh -l

echo "At entrypoint!"
echo "file_path = $INPUT_FILE_PATH"
echo "glob = $INPUT_GLOB"

# if the FILE_PATH exists then we will just be uploading the file
if [[ -z "$INPUT_FILE_PATH" && -z "$INPUT_GLOB" ]]
then
    export INPUT_FILE_PATH="/out/repoarchive.zip"
    mkdir /out
    cd "$GITHUB_WORKSPACE"
    echo "Creating archive";
    zip -r "$INPUT_FILE_PATH" ./* -x .git/*
fi

echo "Running node"

# run the script to send to sharepoint
node /app/index.js
[ $? -eq 0 ]  || exit 1

