cc.Class({
    extends: cc.Component,

    properties: {
        direcao: cc.Vec2,
        _movimentacao: cc.Component,
        _controleAnimacao: cc.Component,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this);
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
    },
    teclaPressionada(event) {
        if (event.keyCode == cc.KEY.a) {
            this.direcao.x = -1;
        }
        if (event.keyCode == cc.KEY.d) {
            this.direcao.x = 1;
        }
        if (event.keyCode == cc.KEY.w) {
            this.direcao.y = 1;
        }
        if (event.keyCode == cc.KEY.s) {
            this.direcao.y = -1;
        }

    },
    teclaSolta(event) {
        if (event.keyCode == cc.KEY.a) {
            this.direcao.x = 0;
        }
        if (event.keyCode == cc.KEY.d) {
            this.direcao.x = 0;
        }
        if (event.keyCode == cc.KEY.w) {
            this.direcao.y = 0;
        }
        if (event.keyCode == cc.KEY.s) {
            this.direcao.y = 0;
        }
    },

    start() {

    },

    update(dt) {
        this._movimentacao.setDirecao(this.direcao);
        this._controleAnimacao.mudaAnimacao(this.direcao);
    },
});
