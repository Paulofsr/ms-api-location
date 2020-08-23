var logger      = require('../config/logger')(require('../config/settings'));
const {decimal,binary} = require('js-in-bits');

        
function getDate(subPackage){
    //Data epoch que o dado foi coletado
    //A data que o ponto foi adquirido obedece ao EPOCH 
    return new Date(decimal(subPackage.substring(0, 8), 'hexa'));
}

function getDirection(subPackage){
    //Direção que o equipamento se encontra (deve ser dividido por 100 para obter o ângulo correto
    let direction = decimal(subPackage.substring(8, 12), 'hexa')/100;

    //A direção que o equipamento está apontando pode variar entre 0 e 359.99
    return direction >= 0 ? (direction <= 359.99 ? direction : 359.99) : 0;
}

function getDistance(subPackage){
    //Distância percorrida pelo equipamento em metros(hodômetro)
    return decimal(subPackage.substring(12, 20), 'hexa');
}

function getDelayReport(subPackage){
    //Tempo que o equipamento está reportando em minutos (horímetro)
    return decimal(subPackage.substring(20, 28), 'hexa');
}

function getCompositionBin(subPackage){
    //Composição de valores em binário: 
    return binary(subPackage.substring(28, 32), 'hexa');
}

function getVelocity(subPackage){
    //Velocidade atual do veículo em KM/H
    return decimal(subPackage.substring(32, 34), 'hexa');
}

function getLatitude(subPackage){
    //Valor da latitude com precisão de 6 casas decimais
    return decimal(subPackage.substring(34, 42), 'hexa')/1000000;
}

function getLongitude(subPackage){
    //Valor da longitude com precisão de 6 casas decimais
    return decimal(subPackage.substring(42), 'hexa')/1000000;
}

module.exports = {
    getLocation: function(preData){
        logger.debug('getLocation');
        if(preData.subPackage.length != 50)
            throw {
                "status": 417,
                "message": "Invalid data in Package."
            }
        let compositionBin = getCompositionBin(preData.subPackage);
        logger.debug('getLocation1');
        let location = {
            deviceId: preData.deviceId,
            info: {
                date: getDate(preData.subPackage),
                direction: getDirection(preData.subPackage),
                distance: getDistance(preData.subPackage),
                delayReport: getDelayReport(preData.subPackage),
                composition: {
                    complet: compositionBin,
                    GPSFixed: compositionBin[0],
                    GPSHistoric: compositionBin[1],
                    ignitionOn: compositionBin[2],
                    latitudeNegative: compositionBin[3],
                    longitudeNegative: compositionBin[4]
                },
                velocity: getVelocity(preData.subPackage),
                latitude: getLatitude(preData.subPackage),
                longitude: getLongitude(preData.subPackage)
            },
            package: preData.package,
            date: new Date()
        }

        return location;
    }
};