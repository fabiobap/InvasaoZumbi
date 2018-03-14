let Teclado = require("Teclado");
cc.Class({
    extends: cc.Component,

    properties: {
        _vidaAtual: cc.Float,
        _direcao: cc.Vec2,
        _direcaoMouse: cc.Vec2,
        _movimentacao: cc.Component,
        _controleAnimacao: cc.Component,
        _canvas: cc.Canvas,
        _camera: cc.Node,
        _audioTiro: cc.AudioSource,
        _posicaoArma: cc.Node,
        vidaMaxima: cc.Float,
        tiro: cc.Prefab,
        vivo: true,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        this._canvas = cc.find("Canvas");
        this._camera = cc.find("Camera");
        this._canvas.on("mousedown", this.atirar, this)
        this._canvas.on("mousemove", this.calcularDirecaoMouse, this)
        this.vivo = true;
        this.node.on("SofreDano", this.sofrerDano, this);
        this._vidaAtual = this.vidaMaxima;
        this._audioTiro = this.getComponent(cc.AudioSource);
        this._posicaoArma = this.node.children[0];
        this._direcaoMouse = cc.Vec2.UP;
    },

    update(dt) {
        this._movimentacao.setDirecao(this._direcao);
        this._movimentacao.andarPraFrente();

        this._direcao = cc.Vec2.ZERO;

        if (Teclado.estaPressionada(cc.KEY.a)) {
            this._direcao.x -= 1;
        }

        if (Teclado.estaPressionada(cc.KEY.d)) {
            this._direcao.x += 1;

        }
        if (Teclado.estaPressionada(cc.KEY.s)) {
            this._direcao.y -= 1;
        }

        if (Teclado.estaPressionada(cc.KEY.w)) {
            this._direcao.y += 1;

        }

        this.atualizaAnimacao();
    },
    atualizaAnimacao() {

        this._controleAnimacao.mudaAnimacao(this._direcaoMouse, this.estadoAtual());
    },
    sofrerDano(evento) {
        this._vidaAtual -= evento.detail.dano;

        let eventoPerdeVida = new cc.Event.EventCustom("JogadoraPerdeuVida", true);
        eventoPerdeVida.setUserData({
            vidaAtual: this._vidaAtual,
            vidaMaxima: this.vidaMaxima
        });

        this.node.dispatchEvent(eventoPerdeVida);

        if (this._vidaAtual < 0) {
            let jogoAcabou = new cc.Event.EventCustom("JogoAcabou", true);
            this.node.dispatchEvent(jogoAcabou);
        }
    },

    estadoAtual(event) {
        
        let estado;
        if (this._direcao.mag() == 0) {
            estado = "Parado";
        } else {
            estado = "Andar";
        }
        return estado;
    },
    calcularDirecaoMouse(event) {
        let posicaoMouse = event.getLocation();
        posicaoMouse = new cc.Vec2(posicaoMouse.x, posicaoMouse.y);
        posicaoMouse = this._canvas.convertToNodeSpaceAR(posicaoMouse);
        
        let posicaoJogadora = this._camera.convertToNodeSpaceAR(this.node.position);
        
        let direcao = posicaoMouse.sub(posicaoJogadora);
        this._direcaoMouse = direcao;

    },
    atirar(event) {
        let direcao = this._direcaoMouse;
        let disparo = cc.instantiate(this.tiro);
        disparo.getComponent("Tiro").inicializa(this.node.parent,
            this._posicaoArma.position.add(this.node.position),
            direcao);

        this._audioTiro.play();
    },
});
