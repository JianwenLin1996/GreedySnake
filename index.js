$(document).ready(function(){

    let snake = {
        length: 6,
        body: [
            [14,7],[13,7],[12,7],[11,7],[10,7],[9,7]
        ]
    }
    
    let array_game_cell = [];
    let array_game_row = []; 
    let game_width = 40;
    let game_height = 20;   

    let curr_dir = 1;
    let is_paused = true;
    let end_game = true;

    let food = [Math.ceil(Math.random() * game_width), Math.ceil(Math.random() * game_height)];
    let temp_tail = [1,1];

    /* Setting up */

    setting_cells(array_game_row,array_game_cell,game_width,game_height);
    
    mark_cell_snake (snake,array_game_row,array_game_cell);

    mark_cell_food (food[0], food[1]);

    /* Function in game */

    let snake_auto_move = window.setInterval(function(){
            if (!is_paused){
            switch (curr_dir){
                case (0):
                temp_tail = up (snake,array_game_row,array_game_cell);
                break;
                case (1):
                temp_tail = right (snake,array_game_row,array_game_cell);
                break;
                case (2):
                temp_tail = down (snake,array_game_row,array_game_cell);
                break;
                case (3):
                temp_tail = left (snake,array_game_row,array_game_cell);
                break;
                default:
                temp_tail = right (snake,array_game_row,array_game_cell);
            };
            //mark_cell_food (food[0], food[1]);

            if (detect_food(snake)){
                // console.log("food detected");
                clear_cell_food(food[0], food[1]);
                //grow snake
                snake.length ++;
                snake.body.push(temp_tail);
                mark_cell(snake.body[snake.length-1][0],snake.body[snake.length-1][1]);
                // mark_cell_snake (snake,array_game_row,array_game_cell);
                food = generate_cell_food_pos(game_width,game_height);
                mark_cell_food (food[0], food[1]);
                $(".score").text((snake.length-6)*3);

                        
            }else if (detect_body(snake)){
                is_paused = true;
                end_game = true;
                // console.log("inside detection");
                indicate_lose(snake);
            }else{
            };

        };
    },50);

    // let set_food_pos = window.setInterval(function(){
    //     food = generate_cell_food_pos ();
    //     console.log ("x = " + food[0]);
    //     console.log ("y = " + food[y]);
    //     // food_x = Math.ceil(Math.random() * 30);
    //     // food_y = Math.ceil(Math.random() * 15);

    // },1500);
    
    // $("#pause-play").click(function(e){
    //     e.stopImmediatePropagation(); 

    //     is_paused = pause_play(is_paused); 
    //     console.log(is_paused);
   
    // });
    $("#play-icon").click(function(e){
        e.stopImmediatePropagation();  

        is_paused = pause_play(is_paused);    
        console.log(is_paused);
    });
    $("#start-icon").click(function(e){
        e.stopImmediatePropagation();  

        is_paused = false;
        end_game = false;
        $("#start-overlay").css("display", "none");
    });


    $("#refresh-icon").click(function(){
        refresh(snake, array_game_row, array_game_cell);
        food=generate_cell_food_pos(game_width,game_height);
        mark_cell_food(food[0],food[1]);
        // console.log(food);
        curr_dir = 1;
        is_paused = false;
        end_game = false;
        $("#lose-overlay").css("display", "none");
        // $("#pause-play").removeAttr("disabled");

    });

    $(document).on("keypress",function(e){
        e.stopImmediatePropagation();  

        if (!is_paused){
        if (curr_dir != 0 && curr_dir != 2 && (e.which == 115 || e.which == 83 || e.which == 53)){
        // if (curr_dir != 0 && (e.which == 115 || e.which == 83 || e.which == 53)){
            // console.log("down is pressed");
            temp_tail = down (snake,array_game_row,array_game_cell);
            // console.log(snake.body);
            curr_dir = 2;
        }else if (curr_dir != 2 && curr_dir != 0 && (e.which == 119 || e.which == 87 || e.which == 56)){
        // }else if (curr_dir != 2  && (e.which == 119 || e.which == 87 || e.which == 56)){

            // console.log("up is pressed");
            temp_tail = up (snake,array_game_row,array_game_cell);
            // console.log(snake.body);
            curr_dir = 0;
        }else if (curr_dir != 1 && curr_dir != 3 && (e.which==97 || e.which == 65 || e.which == 52)){
        // }else if (curr_dir != 1 && (e.which==97 || e.which == 65 || e.which == 52)){
        //  console.log("left is pressed");
            temp_tail = left (snake,array_game_row,array_game_cell);
            // console.log(snake.body);
            curr_dir = 3;
        }else if (curr_dir != 3 && curr_dir != 1 && (e.which==100 || e.which == 68 || e.which == 54)){
        // }else if (curr_dir != 3 && (e.which==100 || e.which == 68 || e.which == 54)){

            // console.log("right is pressed");
            temp_tail = right (snake,array_game_row,array_game_cell);
            // console.log(snake.body);
            curr_dir = 1;
        }
        }

        if ( !end_game && e.which==32){
            is_paused = pause_play(is_paused);  
            console.log(is_paused);
  
        }else if (end_game && e.which==32){
            refresh(snake, array_game_row, array_game_cell);
            food=generate_cell_food_pos(game_width,game_height);
            mark_cell_food(food[0],food[1]);
            curr_dir = 1;
            is_paused = false;
            end_game = false;
            $("#lose-overlay").css("display", "none");
            $("#start-overlay").css("display", "none");

            // $("#pause-play").removeAttr("disabled");
        }
        //mark_cell_food (food[0], food[1]);

        if (detect_food(snake)){
            console.log("food detected");
            clear_cell_food(food[0], food[1]);
            //grow snake
            snake.length ++;
            snake.body.push(temp_tail);
            mark_cell(snake.body[snake.length-1][0],snake.body[snake.length-1][1]);
            // mark_cell_snake (snake,array_game_row,array_game_cell);
            food = generate_cell_food_pos(game_width,game_height);
            mark_cell_food (food[0], food[1]);
            $(".score").text((snake.length-6)*3);
                    
        }else if (detect_body(snake)){
            is_paused = true;
            end_game = true;
            console.log("inside detection");
            indicate_lose(snake);
        }else{
        };


    })
});

/* Setting Up and Mark Cell */

function setting_cells (row,cell,width,height){
    for (let j = 0; j < height; j++){
        row.push("<div class='game-row'> </div>");
    }
    for (let i = 0; i < width; i++){
        cell.push("<div class='game-cell'> </div>");
    }    
    
    $("#game-box").append(row.join(""));
    $(".game-row").append(cell.join(""));
}

function clear_all(row,cell){
    $("#game-box").empty();
    $("#game-box").append(row.join(""));
    $(".game-row").append(cell.join(""));
}

function mark_cell_snake(obj,row,cell){
    clear_all(row,cell);

    for (let k = 0; k < obj.length; k++){
        mark_cell(obj.body[k][0],obj.body[k][1]);
    }
}

function mark_cell(x,y){ // nth-child is NOT zero index
    $("#game-box .game-row:nth-child("+y+") .game-cell:nth-child("+x+")").addClass("marked-snake");
}

function mark_cell_food(x,y){ // nth-child is NOT zero index
    $("#game-box .game-row:nth-child("+y+") .game-cell:nth-child("+x+")").addClass("marked-food");

}

function clear_cell_food(x,y){ // nth-child is NOT zero index
    $("#game-box .game-row:nth-child("+y+") .game-cell:nth-child("+x+")").removeClass("marked-food");

}

function generate_cell_food_pos (width,height){ // nth-child is NOT zero index
    let pos = [Math.ceil(Math.random() * width), Math.ceil(Math.random() * height)];
    if ($("#game-box .game-row:nth-child("+pos[1]+") .game-cell:nth-child("+pos[0]+")").hasClass("marked-snake")){
        pos = generate_cell_food_pos(width,height);
    }
    return pos;

}

/* During Game */

function detect_food (obj){
    let head_x = obj.body[0][0];
    let head_y = obj.body[0][1];

    let got_food = $("#game-box .game-row:nth-child("+head_y+") .game-cell:nth-child("+head_x+")").hasClass("marked-food");
    // console.log (got_food);
    return (got_food);
}

function detect_body (obj){
    let temp_arr = {};
    // pop first before checking array duplication
    // console.log("checking body detection");
    for (let j of obj.body){
        temp_arr[j] = 1;
    }
    let keys_length = Object.keys(temp_arr).length;
    let obj_length = obj.length;
    return keys_length != obj_length;

    // let head_x = obj.body[0][0];
    // let head_y = obj.body[0][1];

    // check if snake eat itself using duplication in array

    // below wont work
    // let got_body = $("#game-box .game-row:nth-child("+head_y+") .game-cell:nth-child("+head_x+")").hasClass("marked-snake");
    // console.log (got_body);
    // return (got_body);
}

function indicate_lose (obj){
    for (let cell of obj.body){
        $("#game-box .game-row:nth-child("+cell[1]+") .game-cell:nth-child("+cell[0]+")").css("animation-name", "blink_snake");
        $("#game-box .game-row:nth-child("+cell[1]+") .game-cell:nth-child("+cell[0]+")").css("animation-duration", "0.2s");
        $("#game-box .game-row:nth-child("+cell[1]+") .game-cell:nth-child("+cell[0]+")").css("animation-direction", "alternate");
        $("#game-box .game-row:nth-child("+cell[1]+") .game-cell:nth-child("+cell[0]+")").css("animation-iteration-count", "5");
    }
    $("#lose-overlay").css("display", "block");
    // $("#pause-play").attr("disabled", "true");
    

}

function refresh (obj,row,cell){
    obj.length = 6;
    obj.body = [
        [14,7],[13,7],[12,7],[11,7],[10,7],[9,7]
    ];
    
    mark_cell_snake(obj,row,cell);
    $(".score").text(0);
    
    
}

function pause_play (p) {
        if (p == true) {
            // $("#pause-play").html("Pause");  
            $("#pause-overlay").css("display", "none");  
            return false;           
        }else {
            // $("#pause-play").html("Play");   
            $("#pause-overlay").css("display", "block");   
            return true;
        }
}

/* Direction control */

function down(obj,row,cell){
    let temp_body = [...obj.body];
    let head = [temp_body[0][0],temp_body[0][1]+1 > row.length ? 1 : temp_body[0][1]+1];
    let tail = obj.body.pop();
    obj.body.unshift(head);
    move (head,tail);
    return tail;
}

function up(obj,row,cell){
    let temp_body = [...obj.body];
    let head = [temp_body[0][0],temp_body[0][1]-1 < 1 ? row.length : temp_body[0][1]-1];
    let tail = obj.body.pop();
    obj.body.unshift(head);
    move (head,tail);
    return tail;
}

function left(obj,row,cell){
    let temp_body = [...obj.body];
    let head = [temp_body[0][0]-1 < 1 ? cell.length : temp_body[0][0]-1 ,temp_body[0][1]];
    let tail = obj.body.pop();
    obj.body.unshift(head);
    move (head,tail);
    return tail;
}

function right(obj,row,cell){
    let temp_body = [...obj.body];
    let head = [temp_body[0][0]+1  > cell.length ? 1 : temp_body[0][0]+1,temp_body[0][1]];
    let tail = obj.body.pop();
    obj.body.unshift(head);
    move (head,tail);
    return tail;
    //mark_cell_snake (obj,row,cell);
}

function move (head, tail){
    $("#game-box .game-row:nth-child("+tail[1]+") .game-cell:nth-child("+tail[0]+")").removeClass("marked-snake");

    $("#game-box .game-row:nth-child("+head[1]+") .game-cell:nth-child("+head[0]+")").addClass("marked-snake");

    // if (!(head[0] == tail[0] && head[1] == tail[1])){ //check if head is at previous tail position

    //     $("#game-box .game-row:nth-child("+tail[1]+") .game-cell:nth-child("+tail[0]+")").removeClass("marked-snake");
    // }else{
    // }

}

// animation-name: example;
//   animation-duration: 4s;
//   animation-iteration-count: 3;


//119 W
//97 A
//100 D
//115 S
//13 ENTER
//32 BLANKSPACE

// function clear_all_mark_cell(row,cell,x,y){   
    
//     let temp_cell = [...cell];
//     temp_cell[x]="<div class='game-cell marked-snake'> </div>";
//     $("#game-box").empty();
//     $("#game-box").append(row.join(""));
//     $(".game-row").append(cell.join(""));

//     $("#game-box .game-row:nth-child("+y+")").html(temp_cell.join(""));
// }