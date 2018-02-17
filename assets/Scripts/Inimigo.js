cc.Class({
    extends: cc.Component,

    properties: {
        alvo: cc.Node,
        _movimentacao: cc.Component,
        _controleAnimacao: cc.Component,
        _gameOver: cc.Node,
        distanciaAtaque: cc.Float,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        this._gameOver = cc.find("GameOver");
    },

    start() {

    },

    update(dt) {
        let direcao = this.alvo.position.sub(this.node.position);
        let distancia = direcao.mag();
        this._controleAnimacao.mudaAnimacao(direcao, "Andar");
        this._movimentacao.setDirecao(direcao);
        if (distancia < this.distanciaAtaque) {
            this.alvo.getComponent("Jogador").vivo = false;
        }
    },
});
