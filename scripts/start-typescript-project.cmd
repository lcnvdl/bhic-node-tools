echo Installing typescript...
npm i --save-dev typescript eslint ts-node

echo Installing mocha...
npm i --save-dev chai mocha nyc

echo Installing @types...
npm i --save-dev @types/chai @types/mocha  @types/node


:if '[type]'=='lib'
:begin
copy [dataDirectory]/build.lib.bhic build.bhic
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
    -   set type=lib
    -   set main=lib/index.js
    -   save
    -   close
:end

mkdir tests
copy [dataDirectory]/example.test.ts tests/example.test.ts
