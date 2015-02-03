window.onload = function () {
    var roll_elem = document.getElementById("roller");
    var roller = new Roller(roll_elem);
    roll_elem.addEventListener("mouseover", roller.spin.bind(roller));
    roll_elem.addEventListener("touchstart", roller.spin.bind(roller));
};
