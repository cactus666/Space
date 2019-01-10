window.onload = function () {
    var canvas = document.getElementById('canvas');
    canvas.setAttribute('width', params.dataForSystem.width);
    canvas.setAttribute('height', params.dataForSystem.height);
    fillLengthPlanetCenterPlanetAndAngle();

    createRenderer();
    createScene();
    createCamera(65, 0.1, 170000, -1000, 1000, 1000);
    createLight(0xffffff);
    params.dataForSystem.scene.add(params.dataForSystem.light);

    // Создание планет
    createPlanet(0, 0);
    for(var i = 1; i<params.dataAboutPlanet.countPlanet; i++) {
        createPlanet(i, i+10);
    }



    // Блок кода, который понадобится в дальнейшем для определения направления мыши
    params.objectHover.raycaster = new THREE.Raycaster();
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );

    function look(){
        // function  lookQuickly() {

         if(params.dataForSystem.scene.background == undefined){
             params.dataForSystem.scene.background = params.dataForSystem.background;
         }

         if(params.dataForSystem.pointReady == params.dataAboutPlanet.countPlanet) {
             updataPositionPlanet();
             //Конечно может возникнуть ситуация, в которой мы решили навести мышку на центральный объект и перезагрузить стр (через f5), тогла INTERSECTED будет равен нашему объекту и не увеличется(из-за того что INTERSECTED == intersects[0].object), хотя мы мышка указывает на этот обьект, если мы уберем указатель с этого объекта он не изменится в размерах тк count = 1
             // Здесь определяем куда была наведена наша мышка и в соответствии с эитм осуществяем какие-то действия
             params.objectHover.raycaster.setFromCamera(params.objectHover.mouse, params.dataForSystem.camera);
             params.objectHover.intersects = params.objectHover.raycaster.intersectObjects(params.dataForSystem.scene.children);
             // При первой прогрузке log выдает результат равный кол. объектов на сцене, поэтому во 2 if нужно поставить условие ...<countPlanet (тк это все равно не возможно)
             // console.log(params.objectHover.intersects.length);
             if (params.objectHover.intersects.length > 0) {
                 if ((params.objectHover.INTERSECTED != params.objectHover.intersects[0].object) && (params.objectHover.intersects.length < params.dataAboutPlanet.countPlanet)) {
                     params.objectHover.count++;
                     // т.к. первым прогружается и сразу отображается как наведенное солнце, то !=1 к count, при наведение на космос(не объект все будет работать нормально)
                     if(params.objectHover.count != 1){
                         if(setPositionCamera){
                             params.dataForSystem.camera.position.set(params.objectHover.intersects[0].point.x, params.objectHover.intersects[0].point.y, params.objectHover.intersects[0].point.z + 300);
                         }else{
                             params.objectHover.intersects[0].object.geometry = new THREE.SphereGeometry(params.objectHover.intersects[0].object.geometry.parameters.radius + 100, 12, 12);
                             // params.objectHover.intersects[0].object.geometry.parameters.radius += 100;
                             // createTextForPalent(params.objectHover.intersects[0].object.name, params.objectHover.intersects[0].object.position.x, params.objectHover.intersects[0].object.position.y + (params.objectHover.intersects[0].object.geometry.parameters.radius + 100) * 1.25, params.objectHover.intersects[0].object.position.z, params.objectHover.intersects[0].object.geometry.parameters.radius - 50);
                             // если после наведения на одну планету мы навели на другую не попадая на пространство космоса
                             if((params.objectHover.count>=2) && (params.objectHover.INTERSECTED != null)){
                                 params.objectHover.INTERSECTED.geometry = new THREE.SphereGeometry(params.objectHover.INTERSECTED.geometry.parameters.radius - 100, 12, 12);
                                 // params.objectHover.INTERSECTED.geometry.parameters.radius -= 100;
                             }
                         }
                     }
                     params.objectHover.INTERSECTED = params.objectHover.intersects[0].object;
                 }
             }else{
                 // если оставить if((count >= 2) && (INTERSECTED != null)) то в таком случае при выборе перехода по камере на планету при гаведение на космос ее радиус будет уменьшаться что приведет к созданию "черной дыры"
                 if((params.objectHover.count >= 2) && (params.objectHover.INTERSECTED != null) && (!setPositionCamera)){
                     params.objectHover.INTERSECTED.geometry = new THREE.SphereGeometry(params.objectHover.INTERSECTED.geometry.parameters.radius - 100, 12, 12);
                     // params.objectHover.INTERSECTED.geometry.parameters.radius -= 100;
                     // params.objectHover.INTERSECTED.geometry.boundingSphere.radius -=100;
                 }
                 params.objectHover.INTERSECTED = null;
             }
         }


         params.dataForSystem.renderer.render(params.dataForSystem.scene, params.dataForSystem.camera);

        // }
        // requestAnimationFrame(function () { lookQuickly(); });
        // console.log("sleep");
        // requestAnimationFrame(function () { lookQuickly(); });
        // console.log("sleep");



        requestAnimationFrame(function () { look(); });
    }

    look();
};

function fillLengthPlanetCenterPlanetAndAngle(){
    for(var i = 0; i < params.dataAboutPlanet.countPlanet; i++){
        params.dataAboutPlanet.lengthPlanetCenterPlanet[i] = Math.sqrt(Math.pow(params.dataAboutPlanet.coordX[i]/100000, 2) + Math.pow(params.dataAboutPlanet.coordY[i]/100000, 2) + Math.pow(params.dataAboutPlanet.coordZ[i]/100000, 2));
        params.dataAboutPlanet.cosAngleVerticale[i] = Math.sqrt(Math.pow(params.dataAboutPlanet.coordX[i]/100000, 2) + Math.pow(params.dataAboutPlanet.coordZ[i]/100000, 2)) / params.dataAboutPlanet.lengthPlanetCenterPlanet[i];
        params.dataAboutPlanet.delta[i] = Math.acos(params.dataAboutPlanet.coordX[i] / 100000 / params.dataAboutPlanet.lengthPlanetCenterPlanet[i] / params.dataAboutPlanet.cosAngleVerticale[i]);

        // params.dataAboutPlanet.lengthPlanetCenterPlanet[i] = Math.sqrt(Math.pow(params.dataAboutPlanet.coordX[i]/100000, 2) + Math.pow(params.dataAboutPlanet.coordY[i]/100000, 2) + Math.pow(params.dataAboutPlanet.coordZ[i]/100000, 2));
        // params.dataAboutPlanet.angleVerticale[i] = Math.acos(Math.sqrt(Math.pow(params.dataAboutPlanet.coordX[i]/100000, 2) + Math.pow(params.dataAboutPlanet.coordZ[i]/100000, 2)) / params.dataAboutPlanet.lengthPlanetCenterPlanet[i]);
        // params.dataAboutPlanet.delta[i] = Math.acos(params.dataAboutPlanet.coordX[i] / 100000 / params.dataAboutPlanet.lengthPlanetCenterPlanet[i] / params.dataAboutPlanet.angleVerticale[i]);
    }
}

function createCamera(angle, start, end, x, y, z){
    params.dataForSystem.camera = new THREE.PerspectiveCamera(angle, params.dataForSystem.width / params.dataForSystem.height, start, end);
    params.dataForSystem.camera.position.set(x, y, z);
    new THREE.OrbitControls(params.dataForSystem.camera);
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

function createPlanet(position, i){
    params.dataForSystem.loaderTexture.load('img/planets/planet'+i+'.jpg', function (texture) {
        var newMaterial = new THREE.MeshBasicMaterial({map: texture});
        var newPlanet = new THREE.SphereGeometry(params.dataAboutPlanet.rPlanet[position]/100, 12, 12);
        var newMesh = new THREE.Mesh(newPlanet, newMaterial);
        newMesh.position.x += params.dataAboutPlanet.coordX[position] / 100000;
        newMesh.position.y += params.dataAboutPlanet.coordY[position] / 100000;
        newMesh.position.z += params.dataAboutPlanet.coordZ[position] / 100000;
        newMesh.name = params.dataAboutPlanet.name[position];
        // meshs.push(newMesh);
        params.dataAboutPlanet.meshs[position] = newMesh;
        params.dataForSystem.scene.add(newMesh);
        // Увеличиваем pointReady на 1, указывая, что еще одна планета готова
        params.dataForSystem.pointReady++;
    });
}

function onWindowResize() {
    params.dataForSystem.camera.aspect = window.innerWidth / window.innerHeight;
    params.dataForSystem.camera.updateProjectionMatrix();
    params.dataForSystem.renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
    event.preventDefault();
    params.objectHover.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    params.objectHover.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function updataPositionPlanet() {
    var start = +new Date()/6000;
    for(var i=1; i<params.dataAboutPlanet.countPlanet; i++){
        params.dataAboutPlanet.meshs[i].position.x = 0 + params.dataAboutPlanet.lengthPlanetCenterPlanet[i] * params.dataAboutPlanet.cosAngleVerticale[i] * Math.cos(start + params.dataAboutPlanet.delta[i]);
        params.dataAboutPlanet.meshs[i].position.z = 0 + params.dataAboutPlanet.lengthPlanetCenterPlanet[i] * params.dataAboutPlanet.cosAngleVerticale[i] * Math.sin(start + params.dataAboutPlanet.delta[i]);
        // params.dataAboutPlanet.meshs[i].position.y = 0 + params.dataAboutPlanet.lengthPlanetCenterPlanet[i] * Math.sqrt(1 - Math.pow(params.dataAboutPlanet.cosAngleVerticale[i], 2));

        // params.dataAboutPlanet.meshs[i].position.x = 0 + params.dataAboutPlanet.lengthPlanetCenterPlanet[i] * Math.cos(params.dataAboutPlanet.angleVerticale[i] + start/10) * Math.cos(start + params.dataAboutPlanet.delta[i]);
        // params.dataAboutPlanet.meshs[i].position.z = 0 + params.dataAboutPlanet.lengthPlanetCenterPlanet[i] * Math.cos(params.dataAboutPlanet.angleVerticale[i] + start/10) * Math.sin(start + params.dataAboutPlanet.delta[i]);
        // params.dataAboutPlanet.meshs[i].position.y = 0 + params.dataAboutPlanet.lengthPlanetCenterPlanet[i] * Math.sin(params.dataAboutPlanet.angleVerticale[i] + start/10);


        // params.dataAboutPlanet.meshs[i].position.x = 0 + ( R / Math.sqrt(a * a + c * c) ) * ( Math.cos(start) - ( Math.sin(start) ) / ( Math.sqrt(a * a + b * b + c * c) ) );
        // params.dataAboutPlanet.meshs[i].position.z = 0 + R * Math.sqrt(a * a + c * c) * Math.sin(start) / Math.sqrt(a * a + b * b + c * c);
        // params.dataAboutPlanet.meshs[i].position.y = 0 - ( R / Math.sqrt(a * a + c * c) ) * ( Math.cos(start) + ( Math.sin(start) ) / ( Math.sqrt(a * a + b * b + c * c) ) );

        // params.dataAboutPlanet.meshs[i].position.x = 0 + Math.cos(start) * params.dataAboutPlanet.coordX[i]/100000;
        // params.dataAboutPlanet.meshs[i].position.z = 0 + Math.sin(start) * params.dataAboutPlanet.coordX[i]/100000;

        // if((params.dataAboutPlanet.meshs[i].position.x > -params.dataAboutPlanet.coordX[i]/100000) & (params.dataAboutPlanet.meshs[i].position.z>=0)){
        //     params.dataAboutPlanet.meshs[i].position.x -=3;
        //     params.dataAboutPlanet.meshs[i].position.z = Math.sqrt(Math.pow((params.dataAboutPlanet.coordX[i]/100000), 2) - Math.pow((params.dataAboutPlanet.meshs[i].position.x), 2));
        // }else{
        //     params.dataAboutPlanet.meshs[i].position.x +=3;
        //     params.dataAboutPlanet.meshs[i].position.z = -Math.sqrt(Math.pow((params.dataAboutPlanet.coordX[i]/100000), 2) - Math.pow((params.dataAboutPlanet.meshs[i].position.x), 2));
        // }

        // if(meshs[i].position.x > -coordX[i]/100000){
        //     meshs[i].position.x-=10;
        // }
        // if(meshs[i].position.x <= -coordX[i]/100000){
        //     // meshs[i].position.x = meshs[i].position.x - 0 + 1;
        //     // meshs[i].position.x = meshs[i].position.x + (-10);
        //     meshs[i].x ++;
        //     // alert(meshs[i].position.x);
        // }
        // meshs[i].position.z -= 1;
        // meshs[i].position.z = Math.sqrt(Math.pow((rPlanet[i]/100), 2) - Math.pow((meshs[i].position.x), 2));
    }
}

function createTextForPalent(text){
    fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif //// fontWeight = "bold"; // normal bold
    params.dataForSystem.loaderFont.load( 'fonts/' + fontName + '_bold.typeface.json', function ( font ) {
        var textGeo = new THREE.TextGeometry(text, {
            font: font,
            size: 100,
            height: 50,
            curveSegments: 12,
            bevelThickness: 2,
            bevelSize: 5,
            bevelEnabled: true
        } );
        var textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
        var mesh = new THREE.Mesh( textGeo, textMaterial );
        mesh.position.set(0, 0, 0);
        params.dataForSystem.scene.add(mesh);
    } );
}