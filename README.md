<h1>The Lord of the Rings SDK via NestJS
  <a
    href="http://nestjs.com/"
    target="blank"
  >
    <img
      src="https://nestjs.com/img/logo_text.svg"
      width="65"
      alt="Nest Logo"
    />
  </a>
</h1>

## Description

It's an api, that provides http endpoints to communicate with main api. 
Another way to use the SDK, which could be more comfortable for developers:

1. Install the SDK as a dependency in their own Nest.js application using a package manager such as npm or yarn. For example, if your SDK is published on npm, other developers can install it with the command: ```npm install thelordoftherings-sdk```
2. Import and register the SDK module in their Nest.js application. They can do this by adding the SDK module to the imports array of their application module, like this:
```typescript
import { Module } from '@nestjs/common';
import { SdkModule } from 'my-sdk';

@Module({
imports: [SdkModule],
})
export class AppModule {}
```

## Environment Configuration
The api will read all environment variables from `.env` file, which is created automatically by the init script from `.env.example`.
Make sure to write BEARER_TOKEN in the `.env`!

## Start Guide
```bash
# install packages
$ npm i 

# build
$ npm run build

# start the application
$ npm start
```
 
## Test

```bash
npm run test
```

## Swagger
RESTful APIs described with already integrated Swagger.
To see all available endpoints visit http://localhost:{PORT}/api/docs,
where PORT is determine in .env, default 3000


##Future improvements
It's nice to have [husky](https://www.npmjs.com/package/husky) to check code before git commit.

Api could be added to docker (if we use on-premise architecture). If we use clouds it should be extended with some deployment scripts depends on cloud provider.

