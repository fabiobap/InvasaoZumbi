cc.Class({
    extends: cc.Component,

    properties: {
        _animacao: cc.Animation,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._animacao = this.getComponent(cc.Animation);
        this._animacao.play("Parado");
    },
    mudaAnimacao(direcao, estado) {
        let proximaAnimacao = estado;

        if (direcao.x > 15) {
            proximaAnimacao += "Direita";
        } else if (direcao.x < -5) {
            proximaAnimacao += "Esquerda";
        }

        if (direcao.y > 30) {
            proximaAnimacao += "Cima";
        } else if (direcao.y < -10) {
            proximaAnimacao += "Baixo";
        }
        if (!this._animacao.getAnimationState(proximaAnimacao).isPlaying)
            this._animacao.play(proximaAnimacao);
        console.log(proximaAnimacao);
    },

    start() {

    },

    // update (dt) {},
});
