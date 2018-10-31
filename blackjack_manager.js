// pcm 20172018a Blackjack oop

let game = null;

function clean(){
    document.getElementById("debug").innerHTML = "";
    document.getElementById("dealer").innerHTML = "";
    document.getElementById("player").innerHTML = "";
}

function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function buttons_initialization(){
    document.getElementById("card").disabled     = false;
    document.getElementById("stand").disabled     = false;
    document.getElementById("new_game").disabled = true;
}

function finalize_buttons(){
    document.getElementById("card").disabled     = true;
    document.getElementById("stand").disabled     = true;
    document.getElementById("new_game").disabled = false;
}


//FUNÇÕES QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
function new_game(){
    clean();
    buttons_initialization();
    game = new BlackJack();//novo jogo
    game.dealer_move();//dealer move
    /*Não se esqueça que a 2ª carta do dealer deve aparecer
    voltada para baixo. Por exemplo, deve substituir a apresentação
    da 2ªcarta do dealer pelo caracter “X”*/
    game.dealer_move();//dealer move
    game.player_move();//player move
    document.getElementById("dealer").innerHTML = game.dealer_cards[0] + "  X";
    document.getElementById("player").innerHTML = game.player_cards;
    debug(game);//faz debug
}

function update_dealer(state){
    let dealer = game.dealer_cards;
    let string = dealer;
    if(state.gameEnded){
        string += "    Won: " + state.dealerWon;
        finalize_buttons();
    }
    debug(game);
    document.getElementById("dealer").innerHTML = string;
}

function update_player(state){
    let player = game.player_cards;
    let string = player;
    if(state.gameEnded){
        string += "    Busted: " + state.playerBusted;
        finalize_buttons();
    }
    debug(game);
    document.getElementById("player").innerHTML = string;
}

function dealer_new_card(){
    if(game.dealerTurn == true){
        let state = game.dealer_move();
        update_dealer(state);
        return state;
    }
}

function player_new_card(){
    let state = game.player_move();
    update_player(state);
    game.setDealerTurn(true);
    return state;
}

function dealer_finish(){
    let state = game.get_game_state();
    while(state.gameEnded == false){
        state = this.dealer_new_card();
        update_dealer(state);
    }
}

