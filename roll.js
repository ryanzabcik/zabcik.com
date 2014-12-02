function Roller(elem){

    this.elem = elem;

    this.last = "";

    this.about_me = [
        /* [weight, string] */
        [1, "I love Vim."],
        [1, "I love Linux."],
        [1, "I love networking."],
        [1, "I love math."],
        [1, "I love Haskell."],
        [1, "I love complex systems."],
        [1, "I keep things organized."],
        [2, "I read papers."],
        [2, "I change often."],
        [2, "I keep an open mind."],
        [2, "I break things."],
        [4, "I tweak things."],
        [4, "I study everything."],
        [4, "I think about everything."],
        [4, "I invent things."],
        [6, "I learn every day."],
        [6, "I design systems."],
        [8, "I write code."],
        [8, "I solve problems."],
    ];

    this.total = this.about_me.reduce(function(acc, x) {
        return acc + x[0];
    }, 0);

    this.spin_times = [25,50,75,100,150,200,400,650,900];

}

Roller.prototype.roll = function() {
    var choice = Math.floor(Math.random()*this.total);
    var i;
    var result;
    for(i = 0; i < this.about_me.length; i++){
        choice -= this.about_me[i][0];
        if(choice <= 0){
            result = this.about_me[i][1];
            break;
        }
    }
    if (result === this.last){
        result = this.roll();
    }
    this.elem.innerHTML = result;
    this.last = result;
    return result;
}

Roller.prototype.spin = function() {
    var i;
    for(i = 0; i < this.spin_times.length; i++){
        window.setTimeout(this.roll.bind(this), this.spin_times[i]);
    }
}
