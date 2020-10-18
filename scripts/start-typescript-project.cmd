npm i --save-dev @types/node typescript

copy [dataDirectory]/build.bhic build.bhic

:open package.json
    -   set scripts.build=bhic build.bhic
    -   save
    -   close

