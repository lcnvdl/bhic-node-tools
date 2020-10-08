:open package.json
    -   get first version > version
    -   close

echo Current version: [version]

:eval +("[version]".split(".")[0])
env set v1 [$eval]
:eval +("[version]".split(".")[1])
env set v2 [$eval]
:eval +("[version]".split(".")[2])
env set v3 [$eval]

env add v3 1

echo New version: [v1].[v2].[v3]

:open package.json
    -   set version = [v1].[v2].[v3]
    -   save
    -   close
