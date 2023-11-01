var models = ['stopwatch', 'cell'];

for(var i = 0; i < models.length; i++){
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src = 'js/oop/' + models[i] + '.js';
    document.body.appendChild(js);
}
