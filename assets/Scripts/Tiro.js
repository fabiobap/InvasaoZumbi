cc.Class({
    extends: cc.Component,

    properties: {
        _movimentacao: cc.Component,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        this._movimentacao = this.getComponent("Movimentacao");
    },

    onCollisionEnter(outro){
        if(outro.node.group == "inimigo"){
        outro.node.destroy();
        }
        this.node.destroy();
    },
    start() {

    },

    update(dt) {
        this._movimentacao.andarPraFrente();
    },
});
