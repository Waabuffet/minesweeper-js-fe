function Stopwatch(elem_m, elem_s) {

    var offset,
        clock,
        interval,
        minutes = 0,
        delay = 1000;
  
    // initialize
    reset();
  
    function start() {
        if (!interval) {
            offset = Date.now();
            interval = setInterval(update, delay);
        }
    }
  
    function stop() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }
  
    function reset() {
        clock = 0;
        minutes = 0;
        stop();
        start();
        render(0);
    }
  
    function update() {
        clock += delta();
        render();
    }
  
    function render() {
        var s = parseInt(clock / 1000);
        if(s == 60){
            minutes++;
            clock = 0;
            s = 0;
        }
        elem_s.innerHTML = (s < 10)? '0' + s : s;
        elem_m.innerHTML = (minutes < 10)? '0' + minutes : minutes;
    }
  
    function delta() {
        var now = Date.now(),
            d = now - offset;
    
        offset = now;
        return d;
    }
  
    // public API
    this.start = start;
    this.stop = stop;
    this.reset = reset;
};