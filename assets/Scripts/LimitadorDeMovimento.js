cc.Class({
    extends: cc.Component,

    properties: {
        limiteMinimo: cc.Vec2,
        limiteMaximo: cc.Vec2,
        usarResolucao: false,

    },
    onLoad() {
        if (this.usarResolucao) {
            let resolucao = cc.director.getVisibleSize();
            let metadeDeAltura = resolucao.height / 2;
            let metadeDeLargura = resolucao.width / 2;

            this.limiteMinimo.x += metadeDeLargura;
            this.limiteMaximo.x -= metadeDeLargura;
            this.limiteMinimo.y += metadeDeAltura;
            this.limiteMaximo.y -= metadeDeAltura;
        }

    },
    update(dt) {
        if (this.node.position.x < this.limiteMinimo.x) {

            this.node.x = this.limiteMinimo.x;

        } else if (this.node.position.x > this.limiteMaximo.x) {

            this.node.x = this.limiteMaximo.x;
        }

        if (this.node.position.y < this.limiteMinimo.y) {

            this.node.y = this.limiteMinimo.y;

        } else if (this.node.position.y > this.limiteMaximo.y) {

            this.node.y = this.limiteMaximo.y;
        }
    },
});
