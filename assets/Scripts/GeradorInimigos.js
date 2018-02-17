cc.Class({
    extends: cc.Component,

    properties: {
        tempoParaGerar: cc.Float,
        inimigoPrefab: cc.Prefab,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.schedule(this.gerar, this.tempoParaGerar);
    },

    start() {

    },
    gerar() {
        let zumbi = cc.instantiate(this.inimigoPrefab);
        zumbi.parent = this.node.parent;
        zumbi.position = this.node.position;
    },

    // update (dt) {},
});
