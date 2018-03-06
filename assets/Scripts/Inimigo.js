cc.Class({
    extends: cc.Component,

    properties: {
        alvo: cc.Node,
        dano: cc.Float,
        distanciaAtaque: cc.Float,
        tempoAtaque: cc.Float,
        _movimentacao: cc.Component,
        _controleAnimacao: cc.Component,
        _gameOver: cc.Node,
        _cronometroAtaque: cc.Float,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        this._gameOver = cc.find("GameOver");
        this.alvo = cc.find("Personagens/Personagem");
        this.node.on("SofrerDano", this.morrer, this);
        this._cronometroAtaque = this.tempoAtaque;
    },

    update(dt) {
        let direcao = this.alvo.position.sub(this.node.position);
        let distancia = direcao.mag();

        this._controleAnimacao.mudaAnimacao(direcao, "Andar");
        this._movimentacao.setDirecao(direcao);
        this._movimentacao.andarPraFrente();

        this._cronometroAtaque -= dt;

        if (distancia < this.distanciaAtaque && this._cronometroAtaque < 0) {
            this.alvo.emit("SofreDano", {
                dano: this.dano
            });
            this._cronometroAtaque = this.tempoAtaque;
        }
    },
    morrer() {
        let eventoMorte = new cc.Event.EventCustom("ZumbiMorreu", true);
        this.node.dispatchEvent(eventoMorte);
        this.node.destroy();
    }
});
