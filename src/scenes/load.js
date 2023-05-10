class Load extends Phaser.Scene{
    constructor(){
        super('loadscene');
    }

    preload(){
        
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        //

        this.load.path = './assets/';
        console.log('assets path has been set');

        //real square
        this.load.atlas('bSquare', 'blueSquare/blueSquareSheet.png', 'blueSquare/trueBlueSquare.json');

        //triangle
        this.load.image('rTriangle', 'redTriangle/redTriangleL.PNG');
        this.load.image('rTriangle2', 'redTriangle/redTriangleM.PNG');
        this.load.image('rTriangle3', 'redTriangle/redTriangleS.PNG');
        

    }
    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
    }
}

