cc.Class({
    extends: cc.Component,

    properties: {
        _gameOver: cc.Node,
        _possoReiniciar: false,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.resume();

        this._gameOver = cc.find("Interface/GameOver");

        let canvas = cc.find("Canvas");
        canvas.on("mousedown", this.jogarNovamente, this);

        cc.director.getScene().on("JogoAcabou", this.jogoAcabou, this);
    },

    jogoAcabou() {
        this._possoReiniciar = true;
        cc.director.pause();
        this._gameOver.active = true;

    },

    jogarNovamente() {
        if (this._possoReiniciar) {
            cc.director.loadScene("Jogo");
        }
    },
});
