cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter(outro){
        outro.node.destroy();
        this.node.destroy();
    },
    start() {

    },

    //update(dt) {},
});
