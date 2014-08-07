function Roller(elem){

    this.elem = elem;

    /* array of tulpes of weights and strings */
    this.things = [
        [1, "I keep things organized."],
        [2, "I read papers."],
        [2, "I change often."],
        [2, "I keep an open mind."],
        [2, "I break things."],
        [2, "I learn every day."],
        [4, "I tweak things."],
        [4, "I study everything."],
        [4, "I think about everything."],
        [4, "I invent things."],
        [6, "I design systems."],
        [8, "I write code."],
        [12, "I solve problems."],
    ];

    this.total = this.things.reduce(function(acc, x) {
        return acc + x[0];
    }, 0);

    this.spin_times = [25,50,75,100,150,200,400,650,1000];

}

Roller.prototype.roll = function() {
    var choice = Math.floor(Math.random()*this.total);
    var i;
    var result;
    for(i = 0; i < this.things.length; i++){
        choice -= this.things[i][0];
        if(choice <= 0){
            result = this.things[i][1];
            break;
        }
    }
    this.elem.innerHTML = result;
    return result;
}

Roller.prototype.spin = function() {
    var i;
    for(i = 0; i < this.spin_times.length; i++){
        window.setTimeout(this.roll.bind(this), this.spin_times[i]);
    }
}
