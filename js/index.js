var programming_modes = ['functions', 'oop'];
var chosen_programming_mode = 0;

var js = document.createElement("script");

js.type = "text/javascript";
js.src = 'js/' + programming_modes[chosen_programming_mode] + '.js';

document.body.appendChild(js);