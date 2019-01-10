window.onload = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvas = document.getElementById('canvas');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    // После подключения библиотеки, есть один глобальный объет THREE, указываем куда выводить все наше действо
    var renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0x000000);

    //Создание сцены
    var scene = new THREE.Scene();

    // Первый параметр - угол обзора(по умолчанию 45, в играх от 60 до 90)
    // Второй параметр - пропорции (отношение горизонтали к вертикали)
    // Третий(от) и четвертый(до) параметры указывают облость видимости в пикселях
    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    // Выставляем позицию камеры (x, y, z)
    camera.position.set(0, 0, 1000);
    new THREE.OrbitControls(camera);

    // Сщздание источника света
    // Рассеянный свет (не имеет место расположения + направления)
    var light = new THREE.AmbientLight(0xffffff);
    // Добавление на сцену
    scene.add(light);

    // var geometry = new THREE.PlaneGeometry(300, 300, 12, 12);
    var geometry = new THREE.SphereGeometry(200, 12, 12);
    // color указывает какая гамма может использоваться (0x00ff00 - зеленая)
    // Объект залитый сверху - wireframe: true (объект пустотелый)
    // Свойство vertexColors разрешает использовать свой цвет для каждой грани
    var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false, vertexColors: THREE.FaceColors});

    for(var i = 0; i < geometry.faces.length; i++){
        geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
    }

    var mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);




    function look(){
        // mesh.position.x += 1;
        // mesh.rotation.y += Math.PI/100;/*1/10;*/

        renderer.render(scene, camera);
        // Отправляет запрос на показ следующего кадра, браузер будет показывать след кадр только когда будет готов. Обеспечивает max показ кадров на который способен браузер
        requestAnimationFrame(function () { look(); })
    }

    look();
}
