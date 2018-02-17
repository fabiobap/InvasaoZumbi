cc.Class({
    extends: cc.Component,

    properties: {
        _direcao: cc.Vec2,
        velocidade: cc.Float,
        _deltaTime: 0,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {},

    start() {

    },

    update(dt) {
        this._deltaTime = dt;
    },
    andarPraFrente() {
        this._andar(1);
    },
    andarPraTras() {
        this._andar(-1);
    },
    _andar(sentido) {
        let deslocamento = this._direcao.mul(sentido * this._deltaTime * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
    },
    setDirecao(direcao) {
        this._direcao = direcao.normalize();
    },

});
