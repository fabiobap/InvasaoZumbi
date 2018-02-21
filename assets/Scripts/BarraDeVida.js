
cc.Class({
    extends: cc.Component,

    properties: {
        barraDeVida: cc.ProgressBar,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.barraDeVida = this.getComponent(cc.ProgressBar);
        cc.director.getScene().on("JogadoraPerdeuVida", this.atualizaBarraDeVida, this);
    },
    atualizaBarraDeVida(evento){
        let dados = evento.getUserData();
        this.barraDeVida.progress = dados.vidaAtual / dados.vidaMaxima;
    },

});
