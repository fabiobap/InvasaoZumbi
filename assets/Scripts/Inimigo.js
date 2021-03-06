cc.Class({
    extends: cc.Component,

    properties: {
        alvo: cc.Node,
        dano: cc.Float,
        distanciaAtaque: cc.Float,
        tempoAtaque: cc.Float,
        distanciaPerseguir: cc.Float,
        distanciaAtaque: cc.Float,
        tempoVagar: cc.Float,
        direcaoVagar: cc.Vec2,
        vidaMaxima: cc.Float,
        _movimentacao: cc.Component,
        _controleAnimacao: cc.Component,
        _gameOver: cc.Node,
        _cronometroAtaque: cc.Float,
        _tempoRestanteParaVagar: cc.Float,
        _vidaAtual: cc.Float,
        _atacando: cc.Boolean,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        this._gameOver = cc.find("GameOver");
        this.alvo = cc.find("Personagens/Personagem");
        this.node.on("SofrerDano", this.sofrerDano, this);
        this._tempoRestanteParaVagar = this.tempoVagar;
        this.direcaoVagar = cc.Vec2.UP;
        this._vidaAtual = this.vidaMaxima;
        this._atacando = false;
    },

    update(dt) {

        if (!this.atacando) {
            this._cronometroAtaque -= dt;
            this._tempoRestanteParaVagar -= dt;

            let direcaoAlvo = this.alvo.position.sub(this.node.position);
            let distancia = direcaoAlvo.mag();

            if (distancia < this.distanciaAtaque) {
                this.iniciarAtaque(direcaoAlvo);
            } else if (distancia < this.distanciaPerseguir) {
                this.andar(direcaoAlvo);
            } else {
                this.vagar();
            }
        }
    },
    andar(direcao) {
        this._controleAnimacao.mudaAnimacao(direcao, "Andar");
        this._movimentacao.setDirecao(direcao);
        this._movimentacao.andarPraFrente();
    },
    iniciarAtaque(direcao) {
        this._controleAnimacao.mudaAnimacao(direcao, "Atacar");
        this._atacando = true;

    },
    atacar() {
        this.alvo.emit("SofreDano", {
            dano: this.dano
        });
        this._atacando = false;
    },
    vagar() {
        if (this._tempoRestanteParaVagar < 0) {
            this.direcaoVagar = new cc.Vec2(Math.random() - 0.5, Math.random() - 0.5);
            this._tempoRestanteParaVagar = this.tempoVagar;
        }
        this.andar(this.direcaoVagar);
    },
    sofrerDano(evento) {
        this._vidaAtual -= evento.detail.dano;
        this.node.emit("atualizaVida", {
            vidaAtual: this._vidaAtual,
            vidaMaxima: this.vidaMaxima
        });
        if (this._vidaAtual < 0) {
            this.morrer();
        }
    },
    morrer() {
        let eventoMorte = new cc.Event.EventCustom("ZumbiMorreu", true);
        this.node.dispatchEvent(eventoMorte);
        this.node.destroy();
    }
});
