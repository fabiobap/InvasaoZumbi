cc.Class({
    extends: cc.Component,

    properties: {

    },


    update(dt) {
        this.node.zIndex = -this.node.y;
    },
});
