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
    mudaAnimacao(direcao) {
        let proximaAnimacao = "Andar";

        if (direcao.x > 0) {
            proximaAnimacao += "Direita";
        } else if (direcao.x < 0) {
            proximaAnimacao += "Esquerda";
        }

        if (direcao.y > 0) {
            proximaAnimacao += "Cima";
        } else if (direcao.y < 0) {
            proximaAnimacao += "Baixo";
        }

        if (proximaAnimacao == "Andar") {
            proximaAnimacao = "Parado";
        }
        if (!this._animacao.getAnimationState(proximaAnimacao).isPlaying)
            this._animacao.play(proximaAnimacao);
    },

    start() {

    },

    // update (dt) {},
});
