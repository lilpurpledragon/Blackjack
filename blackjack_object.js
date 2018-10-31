// pcm 20172018a Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;
// Classe BlackJack - construtor
class BlackJack {
    constructor() {
        // array com as cartas do dealer
        this.dealer_cards = [];
        // array com as cartas do player
        this.player_cards = [];
        // variável booleana que indica a vez do dealer jogar até ao fim
        this.dealerTurn = false;

        this.stand = false;

        // objeto na forma literal com o estado do jogo
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false
        };

        //métodos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)
        this.new_deck = function () {
            let deck = [];
            let naipe = "";
            for(let count = 0; count < 4; ++count){
                if(count == 0)naipe = "O";
                if(count == 1)naipe = "E";
                if(count == 2)naipe = "C";
                if(count == 3)naipe = "P";
                for(let n = 1; n < 14; ++n){
                    const carta = [naipe, n];
                    deck.push(carta);
                }
            }
            return deck;
        };

        this.shuffle = function (deck) {
            let indices = [];
            for(let i = 0; i<52; ++i){indices.push(i);}
            let index = 0;
            let new_deck = [];
            for(let count = 0; count < 52; ++count){
                index = indices[Math.floor(Math.random()*indices.length)];
                new_deck.push(deck[index]);
                indices.splice(indices.indexOf(index), 1);
            }
            return new_deck;
        };

        // baralho de cartas baralhado
        this.deck = this.shuffle(this.new_deck());
    }

    // métodos
    // devolve as cartas do dealer num novo array (splice)
    get_dealer_cards() {
        return this.dealer_cards.splice();
    }

    // devolve as cartas do player num novo array (splice)
    get_player_cards() {
        return this.player_cards.splice();
    }

    // Ativa a variável booleana "dealerTurn"
    setDealerTurn (val) {
        this.dealerTurn = val;
    }

    //MÉTODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
    get_cards_value(cards) {
        let count = 0;
        for(let i = 0; i<cards.length; ++i){
            let valor_card = cards[i][1];
            if(valor_card >=2 && valor_card <=9){
                count = count + valor_card;
            }
            else{
                if(valor_card >=10){
                    count = count + 10;
                }
                else{
                    if(count > 10){count = count + 1;}
                    else{count = count + 11;}
                }
            }
        }
        return count;
    }

    dealer_move() {
        const deck = this.deck;
        const card = deck[0];
        deck.splice(0, 1);
        this.dealer_cards.push(card);
        //document.getElementById("dealer_cards").innerHTML =  this.dealer_cards;
        //document.getElementById("dealer_cards").innerHTML = JSON.stringify(this);
        return this.get_game_state();
    }

    player_move() {
        const deck = this.deck;
        const card = deck[0];
        deck.splice(0, 1);
        this.player_cards.push(card);
        //document.getElementById("player_cards").innerHTML =  this.player_cards;
        //document.getElementById("player_cards").innerHTML = JSON.stringify(this);
        return this.get_game_state();
    }

    get_game_state() {
        const dealer_value = this.get_cards_value(this.dealer_cards);
        console.log("Dealer: " + dealer_value);
        const player_value = this.get_cards_value(this.player_cards);
        console.log("Player: " + player_value);
        if (player_value > MAX_POINTS) {
            this.state.gameEnded = true;
            this.state.dealerWon = false;
            this.state.playerBusted = true;
        }
        if (player_value == MAX_POINTS) {
            this.state.gameEnded = true;
            this.state.dealerWon = false;
            this.state.playerBusted = false;
        }

        if(dealer_value < MAX_POINTS && dealer_value > player_value){
            this.state.gameEnded = true;
            this.state.dealerWon = true;
            this.state.playerBusted = false;
        }
        if(dealer_value > MAX_POINTS){
            this.state.gameEnded = true;
            this.state.dealerWon = false;
            this.state.playerBusted = false;
        }
        return this.state;
    }

}

