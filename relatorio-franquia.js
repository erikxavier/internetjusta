var bc = require('byte-converter').converterBase2;
const MES = 2592000;

Number.prototype.toHHMMSS = function () {
    var seconds = Math.floor(this),
        hours = Math.floor(seconds / 3600);
    seconds -= hours*3600;
    var minutes = Math.floor(seconds / 60);
    seconds -= minutes*60;

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+'h '+minutes+'m '+seconds+'s';
}

function totalMesTB(vel) {
    var total = bc(vel, 'MB', 'B');
    total *= MES;
    total /= 8;
    return bc(total, 'B', 'TB');
    
}

function razaoFranq(totalMesTB, franq) {
    return (franq*100)/bc(totalMesTB,'TB', 'GB');    
}

function totalSegundosMes(razao) {
    return (MES*(razao/100));
}

function totalSegundosDia(totalHorasMes) {
    return totalHorasMes/30;
}

function RelatorioFranquia(velocidade, franquia) {
    this.velocidade = velocidade;
    this.franquia = franquia;
    
    var totalMes = totalMesTB(velocidade),    
    razao = razaoFranq(totalMes, franquia),
    totalSegundos = totalSegundosMes(razao),
    horasDia = totalSegundosDia(totalSegundos);
        
    this.totalMesTB = totalMes.toFixed(2)+"TB";
    this.razao = razao.toFixed(2)+"%";
    this.tempoMes = totalSegundos.toHHMMSS();
    this.tempoDia = horasDia.toHHMMSS();

}

module.exports = RelatorioFranquia;