$(() => {
    console.log('start');

    const config = {
        type: Phaser.AUTO,
        width: '100%',
        height: '100%',
        parent: 'canvas-container',
        scale: {
            mode: Phaser.Scale.RESIZE
        },
        scene: [GameScene]
    };

    new Phaser.Game(config);
});

class GameScene extends Phaser.Scene {

    constructor() {
        super(GameScene.name);

        this.oneThird = .33;
        this.primaryColor = 0xffffff;
        this.isCrossNext = true;
    }

    preload() {
        this.load.audio('cardPlace1', 'audio/cardPlace1.ogg');
        this.load.audio('cardPlace2', 'audio/cardPlace2.ogg');
    }

    create() {
        this.placeCrossSound = this.sound.add('cardPlace1');
        this.placeCircleSound = this.sound.add('cardPlace2');

        this.graphics = this.add.graphics();

        this.drawGame();

        // this.placeCrossSound.play();
        // this.placeCircleSound.play();

        $(window).resize(() => this.drawGameAfterResize());
    }

    drawGameAfterResize() {
        this.graphics.clear();
        this.destroyFields();
        this.drawGame();
    }

    destroyFields() {
        this.field00.destroy();
        this.field10.destroy();
        this.field20.destroy();
        this.field01.destroy();
        this.field11.destroy();
        this.field21.destroy();
        this.field02.destroy();
        this.field12.destroy();
        this.field22.destroy();
    }

    drawGame() {
        this.captureWindowSize();
        this.computeSizes();
        this.setLineStyle();

        this.createFields();
        this.drawBoard();
    }

    captureWindowSize() {
        this.windowWidth = $(window).width();
        this.windowHeight = $(window).height();
    }

    computeSizes() {
        this.boardLineWidth = this.windowWidth * .025;
        this.fieldWidth = this.windowWidth * this.oneThird;
        this.fieldHeight = this.windowHeight * this.oneThird;
    }

    setLineStyle() {
        this.graphics.lineStyle(this.boardLineWidth, this.primaryColor);
    }

    createFields() {
        this.field00 = this.add.graphics();
        this.field10 = this.add.graphics();
        this.field20 = this.add.graphics();
        this.field01 = this.add.graphics();
        this.field11 = this.add.graphics();
        this.field21 = this.add.graphics();
        this.field02 = this.add.graphics();
        this.field12 = this.add.graphics();
        this.field22 = this.add.graphics();

        const firstX = 0;
        const firstY = 0;
        const secondX = this.fieldWidth;
        const secondY = this.fieldHeight;
        const thirdX = this.fieldWidth * 2;
        const thirdY = this.fieldHeight * 2;
        this.setFieldPosition(this.field00, firstX, firstY);
        this.setFieldPosition(this.field10, secondX, firstY);
        this.setFieldPosition(this.field20, thirdX, firstY);
        this.setFieldPosition(this.field01, firstX, secondY);
        this.setFieldPosition(this.field11, secondX, secondY);
        this.setFieldPosition(this.field21, thirdX, secondY);
        this.setFieldPosition(this.field02, firstX, thirdY);
        this.setFieldPosition(this.field12, secondX, thirdY);
        this.setFieldPosition(this.field22, thirdX, thirdY);
    }

    /**
     * @param {Phaser.GameObjects.Graphics} fieldGraphics
     * @param {Number} x
     * @param {Number} y
     */
    setFieldPosition(fieldGraphics, x, y) {
        fieldGraphics.setData({ x: x, y: y });
    }

    drawBoard() {
        this.graphics.save();
        this.drawVerticalLine();
        this.drawVerticalLine();
        this.graphics.restore();

        this.graphics.save();
        this.drawHorizontalLine();
        this.drawHorizontalLine();
        this.graphics.restore();

        this.setInteractiveField(this.field00);
        this.setInteractiveField(this.field10);
        this.setInteractiveField(this.field20);
        this.setInteractiveField(this.field01);
        this.setInteractiveField(this.field11);
        this.setInteractiveField(this.field21);
        this.setInteractiveField(this.field02);
        this.setInteractiveField(this.field12);
        this.setInteractiveField(this.field22);
    }

    drawVerticalLine() {
        this.graphics.translateCanvas(this.fieldWidth, 0);
        this.graphics.lineBetween(0, 0, 0, this.windowHeight);
    }
    
    drawHorizontalLine() {
        this.graphics.translateCanvas(0, this.fieldHeight);
        this.graphics.lineBetween(0, 0, this.windowWidth, 0);
    }
    
    /** @param {Phaser.GameObjects.Graphics} fieldGraphics */
    setInteractiveField(fieldGraphics) {
        /** @type {Number} */
        const x = fieldGraphics.data.values.x;
        /** @type {Number} */
        const y = fieldGraphics.data.values.y;

        const field = new Phaser.Geom.Rectangle(x, y, this.fieldWidth, this.fieldHeight);
        fieldGraphics
            .setInteractive(field, Phaser.Geom.Rectangle.Contains)
            .once(Phaser.Input.Events.POINTER_UP, () => this.drawSymbolAtPosition(x, y));
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    drawSymbolAtPosition(x, y) {
        this.graphics.save();
        this.graphics.translateCanvas(x, y);

        if (this.isCrossNext) {
            this.drawCross();
        } else {
            this.drawCircle();
        }

        this.graphics.restore();
    }

    drawCross() {
        const crossSize = .7;
        const crossLineLength = Math.min(this.fieldWidth, this.fieldHeight) / 2 * crossSize;

        this.graphics.save();
        this.graphics.translateCanvas(this.fieldWidth / 2, this.fieldHeight / 2);
        this.graphics.rotateCanvas(Phaser.Math.DegToRad(45));

        this.graphics.lineBetween(-crossLineLength, 0, crossLineLength, 0);
        this.graphics.lineBetween(0, -crossLineLength, 0, crossLineLength);
        
        this.graphics.restore();

        this.isCrossNext = false;
    }

    drawCircle() {
        const circleSize = .3;
        const fieldDimension = Math.min(this.fieldWidth, this.fieldHeight);

        this.graphics.beginPath();
        this.graphics.arc(
            this.fieldWidth / 2, 
            this.fieldHeight / 2, 
            fieldDimension * circleSize, 
            Phaser.Math.DegToRad(0), 
            Phaser.Math.DegToRad(360), 
            false, 
            .02
        );
        this.graphics.strokePath();
        this.graphics.closePath();

        this.isCrossNext = true;
    }
}