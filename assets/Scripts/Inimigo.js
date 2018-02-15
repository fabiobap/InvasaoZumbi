cc.Class({
    extends: cc.Component,

    properties: {
        alvo: cc.Node,
        _movimentacao: cc.Component,
        _controleAnimacao: cc.Component,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
    },

    start() {

    },

    update(dt) {
        let direcao = this.alvo.position.sub(this.node.position);
        this._controleAnimacao.mudaAnimacao(direcao);
        this._movimentacao.setDirecao(direcao);
    },
});
