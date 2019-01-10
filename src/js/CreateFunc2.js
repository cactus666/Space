var width;
var height;
var coordX = [0, 57910006, 108199995, 149599951, 227939920, 778330257, 1429400028, 2870989228, 4504299579];
var rPlanet = [6955, 2440, 6052, 6378, 3397, 71490, 60270, 25560, 24760];
// var coordX = [579, 1081, 1495, 2279, 7783, 14294, 28709, 45042];
// var rPlanet = [24, 60, 63, 33, 714, 602, 255, 247];
var coordY = [0, 0, 0, 0, 0, 0, 0, 0];
var coordZ = [0, 0, 0, 0, 0, 0, 0, 0];
var meshs = [];
var camera, scene, renderer;
var mouse = new THREE.Vector2(), INTERSECTED;
var raycaster;

function createRandomPlanet() {
    var material;
    var mesh;
    var loader = new THREE.TextureLoader();
    loader.load('space.jpg', function ( texture ) {
        material = new THREE.MeshBasicMaterial({map: texture});
        // var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        var centerPlanet = new THREE.SphereGeometry(200, 12, 12);
        mesh = new THREE.Mesh(centerPlanet, material);
        // mesh.material.depthTest = false;
        // mesh.material.depthWrite = false;
        // alert(mesh);
        // return mesh;
        meshs.push(mesh);
    });
};

window.onload = function () {
    width = window.innerWidth;
    height = window.innerHeight;
    var canvas = document.getElementById('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0x000000);
    // renderer.setPixelRatio( window.devicePixelRatio );
    // renderer.setSize( window.innerWidth, window.innerHeight );

    scene =  new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 4000);
    camera.position.set(1000, 1000, 1000);
    new THREE.OrbitControls(camera);
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);


    var loader = new THREE.TextureLoader();
    loader.load('img/planet1.jpg', function ( texture ) {
        var material = new THREE.MeshBasicMaterial({map: texture});
        // var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        var centerPlanet = new THREE.SphereGeometry(200, 12, 12);
        var mesh = new THREE.Mesh(centerPlanet, material);
        // mesh.material.depthTest = false;
        // mesh.material.depthWrite = false;
        // meshs.push(mesh);
        scene.add(mesh);
    });

    raycaster = new THREE.Raycaster();
    // container.appendChild( renderer.domElement );
    // stats = new Stats();
    // container.appendChild( stats.dom );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );

    function look(){
        requestAnimationFrame(function () { look(); })
        render();
        // renderer.render(scene, camera);
    }
    look();
};


var count = 0;
function render() {
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );



    if ( intersects.length > 0 ) {
        // console.log(intersects[0]);
        if ( INTERSECTED != intersects[ 0 ].object ) {
            count++;
            // if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
            if(count != 1){
                // intersects[ 0 ].object.geometry = new THREE.CubeGeometry(444,444,444);
                intersects[ 0 ].object.geometry = new THREE.SphereGeometry(intersects[ 0 ].object.geometry.parameters.radius + 100, 12, 12);
                // intersects[ 0 ].object.material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } );
            }
            INTERSECTED = intersects[ 0 ].object;

            // INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            // INTERSECTED.material.emissive.setHex( 0xff0000 );
        }
    } else {
        if((count >= 2) && (INTERSECTED != null)){
            INTERSECTED.geometry = new THREE.SphereGeometry(INTERSECTED.geometry.parameters.radius - 100, 12, 12);
        }
        // if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        INTERSECTED = null;
    }
    renderer.render( scene, camera );
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove( event ) {
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}