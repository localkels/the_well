/*global Player*/
/*global Dialogue*/

var tileSize = 64;
var dRows = 10;
var dCols = 12;

var player;
var dialogue;
var spaceKey;

var Game = {
  w: tileSize*dCols,
  h: tileSize*dRows,
  lastLocation: 'MyHouse',
  scene: 1, 
  camera: {x:0,y:0} 
};


//Setup Local Storage
if (localStorage.getItem('scene') === null) {
  localStorage.setItem('scene', '1'); 
}
if (localStorage.getItem('haveRope') === null) {
  localStorage.setItem('haveRope', false);
}
if (localStorage.getItem('haveLamp') === null) {
  localStorage.setItem('haveLamp', false); 
}

Game.Boot = function(game) {
  this.game = game;
};

Game.Boot.prototype = {
  preload: function() {
		this.game.stage.backgroundColor = '#000';
		this.game.load.image('loading', 'assets/images/loading.png');
		this.game.load.image('title', 'assets/images/title.png');
		this.game.load.image('instructions', 'assets/images/instructions.png');
    this.game.load.bitmapFont('minecraftia','assets/fonts/font.png','assets/fonts/font.xml');
  },
  create: function() {
   this.game.state.start('Load');
  }
};

Game.Load = function(game) {
  this.game = game;
};

Game.Load.prototype = {
  preload: function() {
    

    //Loading Screen Message/bar
    // var loadingText = this.game.add.bitmapText(Game.w, Game.h, 'minecraftia', 'Loading...', 21);

  	var preloading = this.game.add.sprite(Game.w/2-64, Game.h/2+50, 'loading');
  	this.game.load.setPreloadSprite(preloading);

    this.game.load.tilemap('town','assets/maps/town.json',null,Phaser.Tilemap.TILED_JSON);
    this.game.load.spritesheet('town','assets/images/town.png',tileSize,tileSize,36);
    
    this.game.load.tilemap('myhouse','assets/maps/myhouse.json',null,Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('gramps','assets/maps/gramps.json',null,Phaser.Tilemap.TILED_JSON);
    this.game.load.spritesheet('furniture','assets/images/furniture.png',tileSize,tileSize,20);
    this.game.load.spritesheet('house','assets/images/house.png',tileSize,tileSize,20);

    this.game.load.image('textbox','assets/images/textbox.png',tileSize,tileSize);
    this.game.load.spritesheet('dad','assets/images/npc_dad.png',64,64,12);
    this.game.load.spritesheet('mom','assets/images/npc_mom.png',64,64,12);
    this.game.load.spritesheet('jack','assets/images/npc_jack.png',64,64,15);
    this.game.load.spritesheet('gramps','assets/images/npc_gramps.png',64,64,12);
    this.game.load.spritesheet('clara','assets/images/npc_clara.png',64,64,15);
    this.game.load.image('twitter','assets/images/twitter.png');
  

    // Music Track
    this.game.load.audio('music','assets/audio/a_theme.mp3');
    this.game.load.audio('tomb','assets/audio/forgotten_tombs.mp3');

    dialogue = new Dialogue(this.game);
    dialogue.preload();

    player = new Player(this.game);
    player.preload(); 

    spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  },
  create: function() {
    this.game.state.start('Menu');
  }
};
