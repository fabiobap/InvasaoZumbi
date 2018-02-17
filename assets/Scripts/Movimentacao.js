cc.Class({
    extends: cc.Component,

    properties: {
        _direcao: cc.Vec2,
        velocidade: cc.Float,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {},

    start() {

    },

    setDirecao(direcao){
        this._direcao = direcao.normalize();
    },
    update(dt) {
        let deslocamento = this._direcao.mul(dt * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
    },
    
});
