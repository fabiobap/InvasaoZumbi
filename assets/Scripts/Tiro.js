cc.Class({
    extends: cc.Component,

    properties: {
        _movimentacao: cc.Component,
        dano: cc.Float,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        this._movimentacao = this.getComponent("Movimentacao");
    },


    update(dt) {
        this._movimentacao.andarPraFrente();
    },

    onCollisionEnter(outro) {
        outro.node.emit("SofrerDano", {dano:this.dano});
        this.node.destroy();
    },

    inicializa(pai, posicao, direcao) {
        this.node.parent = pai;
        this.node.position = posicao;
        this._movimentacao.setDirecao(direcao);
    },
});
