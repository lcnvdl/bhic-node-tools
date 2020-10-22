echo Installing typescript...
npm i --save-dev typescript eslint ts-node

echo Installing mocha...
npm i --save-dev chai mocha nyc

echo Installing @types...
npm i --save-dev @types/chai @types/mocha  @types/node

mkdir src
mkdir tests
mkdir .vscode

:if '[type]'=='lib'
:begin
mkdir lib
copy [dataDirectory]/launch.lib.json .vscode/launch.json
copy [dataDirectory]/build.lib.bhic build.bhic
copy [dataDirectory]/index.lib.ts src/index.ts
copy [dataDirectory]/tsconfig.lib.json tsconfig.json
:end

:open package.json
    -   set scripts.build=bhic build.bhic
    -   set scripts.deploy=npm run build && bhic -c node-tools increase-and-publish
    -   set scripts.test=mocha -r ts-node/register tests/**/*.test.ts
    -   set scripts.coverage=nyc -r lcov -e .ts -x "*.test.ts" npm run test
    -   save
    -   close

:if '[type]'=='lib'
:begin
:open package.json
    -   set types=lib
    -   set main=lib/index.js
    -   save
    -   close
:end

copy [dataDirectory]/example.test.ts tests/example.test.ts
