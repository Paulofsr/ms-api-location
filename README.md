# ms-api-location


Esse microserviço é para manter os dados da localização dos dispositivos. E recebe os dados enviados pelas aplicações que o integram desde que respeitem os padrões dos dados enviados. É também fornecido uma rota de requisição para buscar a última localização do dispositivo.

Nesa versão é fornecido as seguintes ações:

* Um método POST para enviar os dados informados pelos dispositivos.
* Um método GET para buscar a última localização do dispositivo.

## Recursos Necessários

Para rodar a aplicação em Docker ou Kubernetes basta somente ou gerar uma imagem da versão escolhida ou usar a imagem disponível repositório [ms-api-location](https://hub.docker.com/r/paulofsr/ms-api-location). Nos Sistemas Operacionais (Windows, Mac ou Linux) será necessário in

* Nodejs
* MongoDB

## Instalação

### Sistema Operacionais

Após instalar os Recursos Necessários e iniciar o MongoDB. Caso serja necesário mudar, basta configurar as seguintes variáveis de ambiente: 

* `PORT` Default: 5300
* `DB` Default: localhost

Tudo pronto! Agora pode executar a atualização das dependências `npm i` e, posteriormente, executar o seguinte comando no prompt:

```shell
node server.js
```

### Docker

Caso queira utilizar um ambiente com [Docker](https://www.docker.com/) basta executar o comando abaixo.

```shell
docker container run --name [NOME_DO_CONTAINER] -d -p [PORTA_DISPONÍVEL]:5300 ms-api-location
```

Altera a informação **NOME_DO_CONTAINER** para um nome a sua escolha, pois isso será importante para montar o link nos container em comunicação com essa aplicação. E no **PORTA_DISPONÍVEL** informe a porta que queira disponibilizar para acessar à aplicação.


## Utilizando

### [POST] **/api/v1/info**

Através do protocolo HTTP deve executar o método POST com os seguinte dados no *Body*:

```json
{
    "deviceId": "99999999",
    "subPackage": "5EFCF950156F017D784000008CA0F8003C013026A1029E72BD",
    "package": "JHQK4H2K3J4H2KJH4KJ23H4JK23H4"
}
```

> **deviceId**: Número do dispositívo que enviou o pacote
> **subPackage**: Parte dos dados do pacote (sem o cabeçalho, número do dispositivo, tipo de pacote e rodapé)
> **package**: O pacote completo

Com o IP ou ALIAS da aplicação em mãos após sua instalação deve informar a rota da seguinte forma, lembrando que é um método **POST**:

```url
[IP_OU_ALIAS]:[PORTA]/api/v1/info
```

O *Status Code* de retorno é o **204**.


### [GET] **/api/v1/location/:device_id**

Para buscar a última localização de um dispositivo será necessário do número do dispositivo para compor a seguinte rota.

```url
[IP_OU_ALIAS]:[PORTA]/api/v1/location/[NÚMERO_DO_DISPOSITIVO]
```

O *Status Code* de retorno é o **200** com o seguinte *Body*:

```json
{
    "info": {
        "composition": {
            "complet": "1111100000000000",
            "GPSFixed": 1,
            "GPSHistoric": 1,
            "ignitionOn": 1,
            "latitudeNegative": 1,
            "longitudeNegative": 1
        },
        "date": "1970-01-19T10:40:37.200Z",
        "direction": 54.87,
        "distance": 25000000,
        "delayReport": 36000,
        "velocity": 60,
        "latitude": 19.932833,
        "longitude": 43.938493
    },
    "_id": "5f40badc3018fa002de6d9ae",
    "deviceId": "671603",
    "package": "50F70A3F73025EFCF950156F017D784000008CA0F8003C013026A1029E72BD73C4",
    "date": "2020-08-22T06:27:40.249Z",
    "__v": 0
}
```

