cc.Class({
    extends: cc.Component,

    properties: {
        _animacao: cc.Animation,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._animacao = this.getComponent(cc.Animation);
        this._animacao.play("AndarBaixo");
    },
    mudaAnimacao (direcao){
        let proximaAnimacao;
        
        if(direcao.x > 0){
            proximaAnimacao = "AndarDireita";
        }else if(direcao.x < 0){
            proximaAnimacao = "AndarEsquerda";
        }else{
            proximaAnimacao = "Parado";
        }
        if(!this._animacao.getAnimationState(proximaAnimacao).isPlaying)
        this._animacao.play(proximaAnimacao);
    },

    start() {

    },

    // update (dt) {},
});
