var params = {
    dataAboutPlanet: {
        coordX: [0, 57910006, -108199995, 149599951, 227939920, 778330257, -1429400028, 2870989228],
        coordY: [0, 57910006, -1000000, 0, 0, 149599, 0, 1429400],
        coordZ: [0, 57910006, 0, -4029400, 10000, -1429400020, 0, 149599],
        lengthPlanetCenterPlanet: [0, 0, 0, 0, 0, 0, 0, 0],
        rPlanet: [6955, 2440, 6052, 6378, 3397, 71490, 60270, 25560],
        name: ['A1','A2','A3','A4','A5','A6','A7','A8'],
        meshs: [0, 0, 0, 0, 0, 0, 0, 0],
        countPlanet: 8,
        cosAngleVerticale: [0, 0, 0, 0, 0, 0, 0, 0],
        delta: [0, 0, 0, 0, 0, 0, 0, 0]
    },
    dataForSystem: {
        width: window.innerWidth,
        height: window.innerHeight,
        loaderTexture: new THREE.TextureLoader(),
        loaderFont: new THREE.FontLoader(),
        camera: null,
        scene: null,
        renderer: null,
        gui: null,
        lastFildGui: {
            rotationX: null,
            rotationY: null,
            rotationZ: null,
            speed: null
        },
        pointReady: 0,
        background: null
    },
    //Объект зависания (над которым зависаем)
    objectHover: {
        mouse: new THREE.Vector2(),
        INTERSECTED: null,
        intersects: null,
        raycaster: null,
        count: 0
    },
    ships: {
        arrShips: [],
        count: 0
    }
};