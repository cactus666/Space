class Ship{
    constructor(pX, pY, pZ, rX, rY, rZ, s,){
        this.positionX = pX;
        this.positionY = pY;
        this.positionZ = pZ;
        this.rotationX = rX;
        this.rotationY = rY;
        this.rotationZ = rZ;
        this.speed = s;
    }
}

var loader = new THREE.ObjectLoader();
// var secondLoader = new THREE.TDSLoader();
function createObjectShip(name, ship) {

    // secondLoader.load("models/SpaceShips/" + name + "/" + name + ".json", (object: Object3D) => {
    //     // this.mesh = new THREE.Mesh((<Mesh> object.children[0]).geometry, new THREE.MeshBasicMaterial({color: 0xFFFFFF}));
    //     // {/*this.mesh.scale.set(.15, .15, .15);*/}
    //     // {/*this.scene.add(this.mesh);*/}
    //     // {/*resolve();*/}
    // });


    loader.load("models/SpaceShips/" + name + "/" + name + ".json", function (obj) {
        obj.children[0].name = params.ships.arrShips.length;
        obj.children[1].name = params.ships.arrShips.length;
        obj.children[2].name = params.ships.arrShips.length;
        obj.children[3].name = params.ships.arrShips.length;
        obj.children[4].name = params.ships.arrShips.length;
        obj.children[5].name = params.ships.arrShips.length;

        params.dataForSystem.scene.add(obj);


        params.ships.arrShips.push({ship, obj});

        // var loader = new THREE.LegacyJSONLoader();
        // loader.load( 'models/shuttle/shuttle.json', function ( geometry, materials ) {
        //     var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( materials ) );
        //     scene.add( mesh );
        // });

        // var loader = new THREE.ObjectLoader();
        // loader.load("models/shuttle/shuttle.json",function ( obj ) {
        // // loader.load("models/starWars/star-wars-dogfight-webgl.json",function ( obj ) {
        //     scene.add( obj );
        // });
    });
}

var delete1, delete2, delete3;
var ship;

function createShip(name, nameFill) {
    if(nameFill=='position'){
        ship = new Ship(0, 0, 0, 0, 0, 0, 0);
        createObjectShip(name, ship);
        if(params.dataForSystem.lastFildGui.rotationX != null){
            params.dataForSystem.gui.remove(params.dataForSystem.lastFildGui.rotationX);
            params.dataForSystem.gui.remove(params.dataForSystem.lastFildGui.rotationY);
            params.dataForSystem.gui.remove(params.dataForSystem.lastFildGui.rotationZ);
            params.dataForSystem.gui.remove(params.dataForSystem.lastFildGui.speed);
        }

        delete1 = params.dataForSystem.gui.add(ship, 'positionX').min(-1000).max(1000).step(1);
        delete2 = params.dataForSystem.gui.add(ship, 'positionY').min(-1000).max(1000).step(1);
        delete3 = params.dataForSystem.gui.add(ship, 'positionZ').min(-1000).max(1000).step(1);
    }else{
        params.dataForSystem.gui.remove(delete1);
        params.dataForSystem.gui.remove(delete2);
        params.dataForSystem.gui.remove(delete3);

        params.dataForSystem.lastFildGui.rotationX = params.dataForSystem.gui.add(ship, 'rotationX').min(-0.001).max(0.001).step(0.0001);
        params.dataForSystem.lastFildGui.rotationY = params.dataForSystem.gui.add(ship, 'rotationY').min(-0.001).max(0.001).step(0.0001);
        params.dataForSystem.lastFildGui.rotationZ = params.dataForSystem.gui.add(ship, 'rotationZ').min(-0.001).max(0.001).step(0.0001);
        params.dataForSystem.lastFildGui.speed = params.dataForSystem.gui.add(ship, 'speed').min(0).max(10).step(0.1);
    }
}


