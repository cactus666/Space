// window.onload = function () {
//     var canvas = document.getElementById('canvas');
//     canvas.setAttribute('width', window.innerWidth);
//     canvas.setAttribute('height', window.innerHeight);
//
//
//
//     var scene = new THREE.Scene();
//     var camera = new THREE.PerspectiveCamera(4, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 75;
//     camera.position.x = 50;
//     camera.position.y = 50;
//     camera.lookAt(scene.position);
//     camera.updateMatrixWorld();
//
//     var renderer = new THREE.WebGLRenderer({canvas: canvas});
//     renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
//     renderer.setClearColor(0x000000);
//
//     var geometry = new THREE.BoxGeometry(5, 5, 5, 5, 5, 5);
//     var material = new THREE.MeshDepthMaterial({
//         opacity: 0.1,
//         blending: THREE.NormalBlending,
//         depthTest: true,
//
//     });
//
//     var cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);
//
//
//
//
//     var options = {
//         velx: 0,
//         vely: 0,
//         camera: {
//             speed: 0.0001
//         },
//         stop: function () {
//             this.velx = 0;
//             this.vely = 0;
//         },
//         reset: function () {
//             this.velx = 0.1;
//             this.vely = 0.1;
//             camera.position.z = 75;
//             camera.position.x = 0;
//             camera.position.y = 0;
//             cube.scale.x = 1;
//             cube.scale.y = 1;
//             cube.scale.z = 1;
//             cube.material.wireframe = true;
//         }
//     };
//
//
//     var gui = new dat.GUI();
//
//     var cam = gui.addFolder('Camera');
//     cam.add(options.camera, 'speed', 0, 0.0010).listen();
//     cam.add(camera.position, 'y', 0, 100).listen();
//     cam.open();
//
//     var velocity = gui.addFolder('Velocity');
//     velocity.add(options, 'velx', -0.2, 0.2).name('X').listen();
//     velocity.add(options, 'vely', -0.2, 0.2).name('Y').listen();
//     velocity.open();
//
//     var box = gui.addFolder('Cube');
//     box.add(cube.scale, 'x', 0, 3).name('Width').listen();
//     box.add(cube.scale, 'y', 0, 3).name('Height').listen();
//     box.add(cube.scale, 'z', 0, 3).name('Length').listen();
//     box.add(cube.material, 'wireframe').listen();
//     box.open();
//
//     gui.add(options, 'stop');
//     gui.add(options, 'reset');
//
// // Rendering the animation
//
//     var render = function() {
//
//         requestAnimationFrame(render);
//
//         var timer = Date.now() * options.camera.speed;
//         camera.position.x = Math.cos(timer) * 100;
//         camera.position.z = Math.sin(timer) * 100;
//         camera.lookAt(scene.position);
//         camera.updateMatrixWorld();
//
//         cube.rotation.x += options.velx;
//         cube.rotation.y += options.vely;
//
//         renderer.render(scene, camera);
//
//     };
//     render();
//
//
// };

var orbit;

window.onload = function () {
    var canvas = document.getElementById('canvas');
    canvas.setAttribute('width', params.dataForSystem.width);
    canvas.setAttribute('height', params.dataForSystem.height);

    createRenderer();
    createScene();
    createCamera(65, 0.1, 170000, 0, 500, 1900);
    createLight(0xffffff);
    params.dataForSystem.scene.add(params.dataForSystem.light);
    // отвечает за изменение пользовательского инерфейся для изменения параметров объектов
    params.dataForSystem.gui = new dat.GUI();
    params.dataForSystem.gui.close();

    var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false, vertexColors: THREE.FaceColors});
    var geometry = new THREE.BoxGeometry(100,100,100);
    for(var i = 0; i < geometry.faces.length; i++){
        geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
    }
    var mesh = new THREE.Mesh(geometry, material);
    params.dataForSystem.scene.add(mesh);


    // Блок кода, который понадобится в дальнейшем для определения направления мыши
    params.objectHover.raycaster = new THREE.Raycaster();
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );

    var kek=0;
    function look(){
        params.dataForSystem.renderer.render(params.dataForSystem.scene, params.dataForSystem.camera);

        if(params.ships.arrShips.length != 0) {

            // if (document.getElementById('createShip').style.background == 'yellow') {
            //     params.ships.mesh.position.x = params.ships.arrShips[params.ships.arrShips.length - 1].positionX;
            //     params.ships.mesh.position.y = params.ships.arrShips[params.ships.arrShips.length - 1].positionY;
            //     params.ships.mesh.position.z = params.ships.arrShips[params.ships.arrShips.length - 1].positionZ;
            // } else {
            //     params.ships.mesh.rotation.x += params.ships.arrShips[params.ships.arrShips.length - 1].rotationX;
            //     params.ships.mesh.rotation.y += params.ships.arrShips[params.ships.arrShips.length - 1].rotationY;
            //     params.ships.mesh.rotation.z += params.ships.arrShips[params.ships.arrShips.length - 1].rotationZ;
            //
            //     // params.ships.mesh.position.x += params.ships.arrShips[params.ships.arrShips.length - 1].positionX * params.ships.arrShips[params.ships.arrShips.length - 1].speed;
            //     // params.ships.mesh.position.y += params.ships.arrShips[params.ships.arrShips.length - 1].positionY * params.ships.arrShips[params.ships.arrShips.length - 1].speed;
            //     // params.ships.mesh.position.z += params.ships.arrShips[params.ships.arrShips.length - 1].positionZ * params.ships.arrShips[params.ships.arrShips.length - 1].speed;
            //
            //     params.ships.mesh.position.z += Math.sin((Math.PI / 2) + params.ships.mesh.rotation.x) * Math.cos(params.ships.mesh.rotation.y) * params.ships.arrShips[params.ships.arrShips.length - 1].speed;
            //     params.ships.mesh.position.x += Math.sin((Math.PI / 2) + params.ships.mesh.rotation.x) * Math.sin(params.ships.mesh.rotation.y) * params.ships.arrShips[params.ships.arrShips.length - 1].speed;
            //     params.ships.mesh.position.y += Math.cos((Math.PI / 2) + params.ships.mesh.rotation.x) * params.ships.arrShips[params.ships.arrShips.length - 1].speed;
            //     // params.dataForSystem.camera.position.set(params.ships.mesh.position.x, params.ships.mesh.position.y+500, params.ships.mesh.position.z+1900);
            //
            //     // Math.sin(-params.ships.mesh.rotation.x) *
            // }

            if (document.getElementById('createShip').style.background == 'yellow') {
                if (params.ships.count == params.ships.arrShips.length) {
                    params.ships.arrShips[params.ships.count - 1].obj.position.x = params.ships.arrShips[params.ships.count - 1].ship.positionX;
                    params.ships.arrShips[params.ships.count - 1].obj.position.y = params.ships.arrShips[params.ships.count - 1].ship.positionY;
                    params.ships.arrShips[params.ships.count - 1].obj.position.z = params.ships.arrShips[params.ships.count - 1].ship.positionZ;
                }
            } else{
                params.ships.arrShips[params.ships.count - 1].obj.rotation.x += params.ships.arrShips[params.ships.arrShips.length - 1].ship.rotationX;
                params.ships.arrShips[params.ships.count - 1].obj.rotation.y += params.ships.arrShips[params.ships.arrShips.length - 1].ship.rotationY;
                params.ships.arrShips[params.ships.count - 1].obj.rotation.z += params.ships.arrShips[params.ships.arrShips.length - 1].ship.rotationZ;

                params.ships.arrShips[params.ships.count - 1].obj.position.z += Math.sin((Math.PI / 2) + params.ships.arrShips[params.ships.count - 1].obj.rotation.x) * Math.cos(params.ships.arrShips[params.ships.count - 1].obj.rotation.y) * params.ships.arrShips[params.ships.count - 1].ship.speed;
                params.ships.arrShips[params.ships.count - 1].obj.position.x += Math.sin((Math.PI / 2) + params.ships.arrShips[params.ships.count - 1].obj.rotation.x) * Math.sin(params.ships.arrShips[params.ships.count - 1].obj.rotation.y) * params.ships.arrShips[params.ships.count - 1].ship.speed;
                params.ships.arrShips[params.ships.count - 1].obj.position.y += Math.cos((Math.PI / 2) + params.ships.arrShips[params.ships.count - 1].obj.rotation.x) * params.ships.arrShips[params.ships.count - 1].ship.speed;
            }
        }

        for(i=0; i<params.ships.arrShips.length-1; i++){
            params.ships.arrShips[i].obj.rotation.x += params.ships.arrShips[i].ship.rotationX;
            params.ships.arrShips[i].obj.rotation.y += params.ships.arrShips[i].ship.rotationY;
            params.ships.arrShips[i].obj.rotation.z += params.ships.arrShips[i].ship.rotationZ;

            params.ships.arrShips[i].obj.position.z += Math.sin((Math.PI / 2) +  params.ships.arrShips[i].obj.rotation.x) * Math.cos( params.ships.arrShips[i].obj.rotation.y) * params.ships.arrShips[i].ship.speed;
            params.ships.arrShips[i].obj.position.x += Math.sin((Math.PI / 2) +  params.ships.arrShips[i].obj.rotation.x) * Math.sin( params.ships.arrShips[i].obj.rotation.y) * params.ships.arrShips[i].ship.speed;
            params.ships.arrShips[i].obj.position.y += Math.cos((Math.PI / 2) +  params.ships.arrShips[i].obj.rotation.x) * params.ships.arrShips[i].ship.speed;
        }


        params.objectHover.raycaster.setFromCamera(params.objectHover.mouse, params.dataForSystem.camera);
        //чтобы можно было наводить мышкой и определять их положение не только на наши созданные приметивы, а еще на сллжные 3d модели нужно передать рекурсивный флаг(как это показано ниже)
        params.objectHover.intersects = params.objectHover.raycaster.intersectObjects(params.dataForSystem.scene.children, true);

        if (params.objectHover.intersects.length > 0) {
            // if ((params.objectHover.INTERSECTED != params.objectHover.intersects[0].object) && (params.objectHover.intersects.length < params.dataAboutPlanet.countPlanet)) {
            //     params.objectHover.count++;
            //     if(params.objectHover.count != 1){
            // console.log(setPositionCamera);
                    if(setPositionCamera){


                        if((document.getElementById('createShip').style.background == 'white')  && (parseInt(params.objectHover.intersects[0].object.name) == params.objectHover.intersects[0].object.name)) {
                            // console.log("rep   x= "+params.objectHover.intersects[0].point.x+500+" y= "+params.objectHover.intersects[0].point.y+500+" z = "+params.objectHover.intersects[0].point.z + 500);
                            params.dataForSystem.camera.position.x = params.objectHover.intersects[0].point.x+500;
                            params.dataForSystem.camera.position.y = params.objectHover.intersects[0].point.y+500;
                            params.dataForSystem.camera.position.z = params.objectHover.intersects[0].point.z+500;

                            // orbit.target.set(params.dataForSystem.camera.position.x,params.dataForSystem.camera.position.y,params.dataForSystem.camera.position.z);
                            // orbit.coupleCenters = true;

                            params.dataForSystem.gui.remove(params.dataForSystem.lastFildGui.rotationX);
                            params.dataForSystem.gui.remove(params.dataForSystem.lastFildGui.rotationY);
                            params.dataForSystem.gui.remove(params.dataForSystem.lastFildGui.rotationZ);
                            params.dataForSystem.gui.remove(params.dataForSystem.lastFildGui.speed);

                            params.dataForSystem.lastFildGui.rotationX = params.dataForSystem.gui.add(params.ships.arrShips[params.objectHover.intersects[0].object.name].ship, 'rotationX').min(-0.001).max(0.001).step(0.0001);
                            params.dataForSystem.lastFildGui.rotationY = params.dataForSystem.gui.add(params.ships.arrShips[params.objectHover.intersects[0].object.name].ship, 'rotationY').min(-0.001).max(0.001).step(0.0001);
                            params.dataForSystem.lastFildGui.rotationZ = params.dataForSystem.gui.add(params.ships.arrShips[params.objectHover.intersects[0].object.name].ship, 'rotationZ').min(-0.001).max(0.001).step(0.0001);
                            params.dataForSystem.lastFildGui.speed = params.dataForSystem.gui.add(params.ships.arrShips[params.objectHover.intersects[0].object.name].ship, 'speed').min(0).max(10).step(0.1);
                            params.dataForSystem.gui.open();
                        }
                    }else{
                        // Выводим инфу в информационное окно
                    }
            //     }
            //     params.objectHover.INTERSECTED = params.objectHover.intersects[0].object;
            // }
        }else{
            // console.log("x= "+params.dataForSystem.camera.position.x+" y= "+params.dataForSystem.camera.position.y+" z = "+params.dataForSystem.camera.position.z);

            //     // если оставить if((count >= 2) && (INTERSECTED != null)) то в таком случае при выборе перехода по камере на планету при гаведение на космос ее радиус будет уменьшаться что приведет к созданию "черной дыры"
        //     if((params.objectHover.count >= 2) && (params.objectHover.INTERSECTED != null) && (!setPositionCamera)){
        //         params.objectHover.INTERSECTED.geometry = new THREE.SphereGeometry(params.objectHover.INTERSECTED.geometry.parameters.radius - 100, 12, 12);
        //         // params.objectHover.INTERSECTED.geometry.parameters.radius -= 100;
        //         // params.objectHover.INTERSECTED.geometry.boundingSphere.radius -=100;
        //     }
        //     params.objectHover.INTERSECTED = null;
        }




        requestAnimationFrame(function () { look(); });
    }
    look();
};




function createCamera(angle, start, end, x, y, z){
    params.dataForSystem.camera = new THREE.PerspectiveCamera(angle, params.dataForSystem.width / params.dataForSystem.height, start, end);
    orbit = new THREE.OrbitControls(params.dataForSystem.camera);
    params.dataForSystem.camera.position.set(x, y, z);
    orbit.update();
}

function createLight(color) {
    params.dataForSystem.light = new THREE.AmbientLight(color);
}

function createScene() {
    params.dataForSystem.scene = new THREE.Scene();
    params.dataForSystem.loaderTexture.load('img/space.jpg', function (texture) {
        params.dataForSystem.background = texture;
    });
}

function createRenderer(){
    // renderer = new THREE.WebGLRenderer({canvas: canvas});
    // antialias: true позволяет сгладить ребра объектов при отдолении камеры
    params.dataForSystem.renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    params.dataForSystem.renderer.setClearColor(0x000000);
}

function onWindowResize() {
    params.dataForSystem.camera.aspect = window.innerWidth / window.innerHeight;
    params.dataForSystem.camera.updateProjectionMatrix();
    params.dataForSystem.renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
    event.preventDefault();
    params.objectHover.mouse.x = ( event.clientX / params.dataForSystem.width ) * 2 - 1;
    params.objectHover.mouse.y = - ( event.clientY / params.dataForSystem.height ) * 2 + 1;
}



