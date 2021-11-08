# typescript-module-debub-v1
An example of how to configure your TypeScript setup such that you can step into sub modules when debugging

```
git clone https://github.com/CodeOfLight/typescript-module-debub-v1.git
cd typescript-module-debub-v1
cd helpers/
npm install
cd ..
cd app
npm install
npm run via_ts-node
code .
```

Now add a breakpoint on line 3 of index.ts


```
var result = mathTools.addOne(4)

```

Press F5 to have VS Code start debugging 

You should be able to step into the addOne() function which is defined in the @testlibs/helpers module and you should step into the TypeScript code and not the JS code. 

