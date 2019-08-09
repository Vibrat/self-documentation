
var Caller = function (x) {
    this.total = 0;

    this.add = function (x) {
        this.total += x;
        return this;
    }


    this.show = function (x) {
        console.log(this.total);
        return this;
    }
}

var caller = new Caller().add(5).show(); // result this.total: 5
console.log(caller.total);