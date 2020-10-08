:open package.json
    -   get first version > version
    -   close

echo Current version: [version]

:eval +("[version]".split(".")[2])

env set version [$eval]
env add version 1

echo New version: [version]

:open package.json
    -   set version = 1.0.[version]
    -   save
    -   close
