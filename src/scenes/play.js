class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
//
    preload(){
      this.anims.create({
          key: 'beat',
          frameRate: 12,
          frames: this.anims.generateFrameNames("bSquare2", {
              prefix: "l0_sprite_square0",
              //suffix: ".png",
              start: 1,
              end: 12,
              //first: 1,
              frames: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          }),
          repeat: -1
      });



  }
  //
    create() {
      this.add.text(20, 20, "Shape Wars Play");
      cursors = this.input.keyboard.createCursorKeys();

      this.triangleSpeed = 250;
      this.bulletSpeed = 200;

      //Creating blue Square
      square = this.physics.add.sprite(centerX, centerY*1.8, 'bSquare2', 'l0_sprite_square01').setOrigin(0.5);
      square.play("beat");
      square.setScale(4);
      square.setCollideWorldBounds(true);
      square.setImmovable();
      square.setMaxVelocity(600, 600);
      square.setDragX(50);
      square.setDepth(1);
      square.destroyed = false;

      //create Bullet Group
      this.bulletGroup = this.add.group({
        runChildUpdate: true
      });



      //triangle codes
      this.triangle01= new redTriangle(this, centerX, centerY/3, 'rTriangle');
      this.triangle02= new redTriangle(this, centerX/3, centerY/3, 'rTriangle');
      this.triangle03 = new redTriangle(this, centerX+(2*(centerX/3)), centerY/3, 'rTriangle');

      //Spawn Triangle randomly
      //create Triangle barrier group
      this.triangleGroup = this.add.group({
        runChildUpdate: true
      });

      //time before spawn set
      this.time.delayedCall(2500, ()=>{
        this.addTriangle();
      });

      this.time.delayedCall(2500, ()=>{
        this.addBullet();
      })

      //Colliders

      //

   



      //KeyConfigure
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

    addTriangle(){
      let speedVariance =  50; 
      let triangle = new redTriangle2(this, this.triangleSpeed - speedVariance);
      this.triangleGroup.add(triangle);
    }

    addBullet(){
      let bullet = new blueSquare2(this, square.x, square.y, this.bulletSpeed);
      this.bulletGroup.add(bullet);
    }



    update(){
      //this.square.update();
      //this.newSquare.update();
      //square.body.offset.x = 0;
      //square.body.offset.y = 0;
      //square.body.width = square.width;
      //square.body.height = square.height;
      //square.body.setSize(square.width, square.height, 0, 0, true);
      if(Phaser.Input.Keyboard.JustDown(cursors.shift)){
        this.scene.start('menuScene');
      }
      if(!square.destroyed){
        if(keyLEFT.isDown){
          console.log("trigger");
          square.body.velocity.x -= squareVelocity;
        }else if(keyRIGHT.isDown){
          square.body.velocity.x += squareVelocity;
        }

        this.physics.world.collide(square, this.triangleGroup, this.squareCollison, null, this);


      }

      
    }

    squareCollison(){
      square.destroyed = true;
      square.destroy();
      this.scene.start('creditsScene');
    }

  }