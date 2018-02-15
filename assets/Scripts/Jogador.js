cc.Class({
    extends: cc.Component,

    properties: {
        direcao: cc.Vec2,
        tiro: cc.Prefab,
        _movimentacao: cc.Component,
        _controleAnimacao: cc.Component,
        _canvas: cc.Canvas,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this);
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        this._canvas = cc.find("Canvas");
        this._canvas.on("mousedown", this.atirar, this)
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

    atirar(event) {
        let posicaoMouse = event.getLocation();
        posicaoMouse = new cc.Vec2(posicaoMouse.x, posicaoMouse.y);
        let direcao = posicaoMouse.sub(this.node.position);
        let disparo = cc.instantiate(this.tiro);
        disparo.parent = this.node.parent;
        disparo.position = this.node.position;
        disparo.getComponent("Movimentacao").setDirecao(direcao);
    },
    start() {

    },

    update(dt) {
        this._movimentacao.setDirecao(this.direcao);
        this._controleAnimacao.mudaAnimacao(this.direcao);
    },
});
