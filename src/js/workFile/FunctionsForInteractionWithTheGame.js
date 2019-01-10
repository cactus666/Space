var setPositionCamera = 0;

function newPositionCamera(button) {
    if(button.style.background == 'green'){
        button.style.background = 'white';
        setPositionCamera = 0;
        params.dataForSystem.gui.close();
    }else{
        button.style.background = 'green';
        setPositionCamera = 1;
    }
}

function newShip(button) {

    if((button.style.background == 'white') || (button.style.background=='')){
        params.dataForSystem.gui.open();
        button.style.background = 'yellow';
        params.ships.count++;
        createShip('shuttle', 'position');
    }else if(button.style.background == 'yellow'){
        button.style.background = 'green';
        createShip('shuttle', 'rotation');
    }else{
        button.style.background = 'white';
        params.dataForSystem.gui.close();
    }
}
