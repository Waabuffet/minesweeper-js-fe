var test = true;

var test_conf = {
    grid_size_x: 20,
    grid_size_y: 10,
    bomb: 10
}

var new_game_btn = document.getElementById('new-game-btn');
var grid_size_x = document.getElementById('grid-size-x');
var grid_size_y = document.getElementById('grid-size-y');
var bombs = document.getElementById('bombs');
var grid = document.getElementById('grid');
var bomb_marker = 'X';
var flag_marker = 'F';
var is_game_over = false;

var cell_elements = [];
var bombs_list = [];
var neighboors_to_check = [];

if (test){
    grid_size_x.value = test_conf.grid_size_x;
    grid_size_y.value = test_conf.grid_size_y;
    bombs.value = test_conf.bomb;
    new_game();
}

function new_game(){
    initBombs(grid_size_x.value, grid_size_y.value);
    construct_grid(grid_size_x.value, grid_size_y.value);
}

function initBombs(x, y){
    bombs_list = [];

    for(var i = 0; i < y; i++){
        bombs_list.push([]);

        for(var j = 0; j < x; j++){
            bombs_list[i].push(' ');
        }
    }

    for(var i = 0; i < parseInt(bombs.value); i++){
        var x = parseInt(Math.random() * parseInt(grid_size_x.value));
        var y = parseInt(Math.random() * parseInt(grid_size_y.value));

        if(bombs_list[y][x] == bomb_marker){
            i--;
        }else{
            bombs_list[y][x] = bomb_marker;
        }
    }
}

function construct_grid(x, y){
    grid.innerHTML = '';
    cell_elements = [];

    for(var i = 0; i < y; i++){
        var row = document.createElement('tr');
        cell_elements.push([]);

        for(var j = 0; j < x; j++){
            var cell = document.createElement('td');
            cell.classList = 'raw-cell';
            cell.addEventListener('click', cell_clicked.bind(null, j, i));
            cell.addEventListener('contextmenu', cell_right_clicked.bind(null, j, i));

            if(test){
                cell.innerHTML = bombs_list[i][j];
            }
            row.appendChild(cell);
            cell_elements[i].push(cell);
        }
        grid.appendChild(row);
    }
}

function cell_clicked(x, y){
    if(!is_game_over){
        var bombs_list_value = bombs_list[y][x];
        if(bombs_list_value == bomb_marker){ //* clicked on a bomb, game over
            cell_elements[y][x].classList = 'bg-red';
            game_over();
        }else if(cell_elements[y][x].classList == ''){ //* clicked on an already clicked cell, speed up game
            var cell_value = cell_elements[y][x].innerHTML;
            if(cell_value != ''){
                //* if number of bombs less or equals to number of flags in neighbours
                //*     if flags pos are same as bombs pos, then reveal other cells that dont have flags with their number
                //*     else game over

                var bomb_count = get_neighbouring_bombs_count(x, y);
                var flag_count = get_neighbouring_flags_count(x, y);

                console.log('count:', bomb_count, flag_count);
                if(bomb_count <= flag_count){
                    console.log('reached here');
                    for(var i = -1; i <= 1; i++){
                        for(var j = -1; j <= 1; j++){
                            var cell_x = x + j;
                            var cell_y = y + i;
                            if(cell_x >= 0 && cell_x < grid_size_x.value && cell_y >= 0 && cell_y < grid_size_y.value){
                                if(bombs_list[cell_y][cell_x] == bomb_marker && cell_elements[cell_y][cell_x].innerHTML != flag_marker){
                                    cell_elements[cell_y][cell_x].classList = 'bg-red';
                                    game_over();
                                }else if(bombs_list[cell_y][cell_x] != bomb_marker){
                                    start_checking_neighbours(cell_x, cell_y);
                                }
                            }
                        }
                    }
                }
            }
        }else{ //* clicked on a unclicked cell, check neighbouring cells to show number
            start_checking_neighbours(x, y);
        }
        if(check_if_game_won()){
            congrats();
        }
    }
}

function start_checking_neighbours(x, y){
    cell_elements[y][x].classList = '';

    var adjacent_bombs_count = get_neighbouring_bombs_count(x, y);

    if(adjacent_bombs_count == 0){
        neighboors_to_check.push({x: x, y: y});
        check_neighbours();
    }else{
        cell_elements[y][x].innerHTML = adjacent_bombs_count;
    }
}

function check_neighbours(){
    while(neighboors_to_check.length > 0){
        var cell_coords = neighboors_to_check.pop();
        for(var i = -1; i <= 1; i++){
            for(var j = -1; j <= 1; j++){
                var cell_x = cell_coords.x + j;
                var cell_y = cell_coords.y + i;
                if(cell_x >= 0 && cell_x < grid_size_x.value && cell_y >= 0 && cell_y < grid_size_y.value){
                    if(cell_elements[cell_y][cell_x].classList != ''){
                        cell_elements[cell_y][cell_x].classList = '';
                        var adjacent_bombs_count = get_neighbouring_bombs_count(cell_x, cell_y);

                        if(adjacent_bombs_count == 0){
                            neighboors_to_check.push({x: cell_x, y: cell_y});
                        }else{
                            cell_elements[cell_y][cell_x].innerHTML = adjacent_bombs_count;
                        }
                    }
                }
            }
        }
    }
}

function get_neighbouring_bombs_count(x, y){
    var bomb_count = 0;
    for(var i = -1; i <= 1; i++){
        for(var j = -1; j <= 1; j++){
            var cell_x = x + j;
            var cell_y = y + i;
            if(cell_x >= 0 && cell_x < grid_size_x.value && cell_y >= 0 && cell_y < grid_size_y.value){
                if(bombs_list[cell_y][cell_x] == bomb_marker){
                    bomb_count++;
                }
            }
        }
    }
    return bomb_count;
}

function get_neighbouring_flags_count(x, y){
    var flag_count = 0;
    for(var i = -1; i <= 1; i++){
        for(var j = -1; j <= 1; j++){
            var cell_x = x + j;
            var cell_y = y + i;
            if(cell_x >= 0 && cell_x < grid_size_x.value && cell_y >= 0 && cell_y < grid_size_y.value){
                if(cell_elements[cell_y][cell_x].innerHTML == flag_marker){
                    flag_count++;
                }
            }
        }
    }
    return flag_count;
}

function game_over(){
    is_game_over = true;
    for(var i = 0; i < grid_size_y.value; i++){
        for(var j = 0; j < grid_size_x.value; j++){
            var cell_value = cell_elements[i][j].innerHTML;

            if(bombs_list[i][j] == bomb_marker && cell_value != flag_marker){
                cell_elements[i][j].innerHTML = bomb_marker;
            }
        }
    }
}

function check_if_game_won(){
    for(var i = 0; i < grid_size_y.value; i++){
        for(var j = 0; j < grid_size_x.value; j++){
            if(cell_elements[i][j].classList != '' && bombs_list[i][j] != bomb_marker){
                return false;
            }
        }
    }
    return true;
}

function congrats(){
    for(var i = 0; i < grid_size_y.value; i++){
        for(var j = 0; j < grid_size_x.value; j++){
            if(bombs_list[i][j] == bomb_marker){
                cell_elements[i][j].classList = 'bg-green';
            }
        }
    }
}

function cell_right_clicked(x, y){
    if(!is_game_over){
        event.preventDefault();
        var cell_text = cell_elements[y][x].innerHTML;

        cell_elements[y][x].innerHTML = (cell_text == flag_marker)? '' : flag_marker;
    }
}

new_game_btn.addEventListener('click', function(e){
    new_game();
});

//TODO: show remaining bombs
//TODO: show timer