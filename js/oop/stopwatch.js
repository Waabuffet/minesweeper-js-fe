function Stopwatch(elem_m, elem_s) {

    var offset,
        clock,
        interval,
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
        stop();
        start();
        render(0);
    }
  
    function update() {
        clock += delta();
        render();
    }
  
    function render() {
        var c = parseInt(stopwatch.clock / 1000);
        var seconds = c % 60;
        var minutes = Math.floor(c / 60);
        clock_s.innerHTML = (seconds < 10)? '0' + seconds : seconds;
        clock_m.innerHTML = (minutes < 10)? '0' + minutes : minutes;
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