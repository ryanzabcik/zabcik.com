window.onload = function () {
    var roll_elem = document.getElementById("roller");
    var roller = new Roller(roll_elem);
    roll_elem.addEventListener("mouseover", roller.spin.bind(roller));
};
