function formataString(valor) {

    return valor.normalize("NFD")
        .replace(/[^a-zA-Zs]/g, "")
        .toLowerCase();
}
module.exports.formataString = formataString


function getRandom(id) {
    var max = 100000
    return Math.floor(Math.random() * max + id)
}
module.exports.getRandom = getRandom


function remover_acentos_espaco(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
module.exports.remover_acentos_espaco = remover_acentos_espaco