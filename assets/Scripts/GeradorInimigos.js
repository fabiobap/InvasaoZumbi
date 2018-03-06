cc.Class({
    extends: cc.Component,

    properties: {
        tempoParaGerar: cc.Float,
        inimigoPrefab: cc.Prefab,
        raio: cc.Float,
        _distanciaMinima: cc.Float,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.schedule(this.gerar, this.tempoParaGerar);
        let resolucao = cc.director.getVisibleSize();
        let metadeDaLargura = resolucao.width / 2;
        this._distanciaMinima = metadeDaLargura;
    },

    gerar() {
        if (this.possoGerar()) {
            let posicao = this.calcularPosicao();
            let zumbi = cc.instantiate(this.inimigoPrefab);
            zumbi.parent = this.node.parent;
            zumbi.position = posicao;
        }
    },

    calcularPosicao() {
        let alcance = new cc.Vec2(Math.random() - 0.5, Math.random() - 0.5);
        alcance = alcance.normalize();
        alcance = alcance.mul(this.raio * Math.random());

        let posicao = this.node.position.add(alcance);
        return posicao;
    },
    possoGerar() {
        let distanciaAtual = this.node.position.sub(cc.Camera.main.node.position);
        distanciaAtual = distanciaAtual.mag();
        let longeOSuficiente = distanciaAtual > this._distanciaMinima;
        return longeOSuficiente;
    },
});
