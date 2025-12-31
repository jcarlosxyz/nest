<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest)
Proyecto de uso de NEST   con la base de datos de MongoDB

## Carga de la base de datos con Docker 

```bash
$ docker run --name mi_mongodb -d -p 27017:27017 -v <ruta donde se guardan los datos>:/data/db mongo
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Cargar una semilla com 1000 regisros
http://localhost:3000/seed/

## Support


## Stay in touch

- Author - [Juan Carlos Zarete Molina ]
- Correo - [Jcarlosxyz@gmail.com]
- X - [@jcarlosxyz]()

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
