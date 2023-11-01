var programming_modes = ['functions', 'OOP'];
var chosen_programming_mode = 0;

var js = document.createElement("script");

js.type = "text/javascript";
js.src = programming_modes[chosen_programming_mode].toLowerCase() + '.js';

document.body.appendChild(js);