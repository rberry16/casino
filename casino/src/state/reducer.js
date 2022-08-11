/* eslint-disable default-case */
import { combineReducers } from "redux";
import { BACCARAT_DEALER_TOTAL, BACCARAT_PLAYER_TOTAL, SHUFFLE, BACCARAT_DEALER_DRAW, BACCARAT_PLAYER_DRAW, BACCARAT_HANDS_RESET, BACCARAT_PLAYER_TURN, BACCARAT_DEALER_TURN, BLACKJACK_PLAYER_DRAW, BLACKJACK_DEALER_DRAW } from "./action-types";



const initialBaccaratState = {
    deck: null,
    playerHand: [],
    dealerHand: [],
    playerTotal: 0,
    dealerTotal: 0,
    message: '',
    lastCard: 0
};
function baccarat(state = initialBaccaratState, action) {
    switch(action.type) {
        case(SHUFFLE): {
            const newDeck = {
                success: action.payload.success,
                deck_id: action.payload.deck_id,
                shuffled: action.payload.shuffled,
                remaining: action.payload.remaining
            }
            return {
                ...state,
                deck: newDeck
            }
        }
        case(BACCARAT_PLAYER_DRAW): {
            const card = action.payload.cards[0];
            let value = 0;
            if (card.value === 'KING' || card.value === 'QUEEN' || card.value === 'JACK') {
                value = 0;
            } else if (card.value === 'ACE') {
                value = 1;
            } else {
                value = Number(card.value);
            }

            if (value > 9) {
                value = value - 10;
            }
            const newPlayerHand = [
                ...state.playerHand,
                {
                    image: action.payload.cards[0].image,
                    value: value,
                    suit: action.payload.cards[0].suit,
                    code: action.payload.cards[0].code
                }
            ]
            return {
                ...state,
                playerHand: newPlayerHand,
                lastCard: value
            }
        }
        case(BACCARAT_DEALER_DRAW): {
            const card = action.payload.cards[0];
            let value = 0;
            if (card.value === 'KING' || card.value === 'QUEEN' || card.value === 'JACK') {
                value = 0;
            } else if (card.value === 'ACE') {
                value = 1;
            } else {
                value = Number(card.value);
            }

            if (value > 9) {
                value = value - 10;
            }

            const newDealerHand = [
                ...state.dealerHand,
                {
                    image: card.image,
                    value: value,
                    suit: card.suit,
                    code: card.code
                }
            ]
            return {
                ...state,
                dealerHand: newDealerHand,
                lastCard: value
            }
        }
        case(BACCARAT_PLAYER_TOTAL): {
            return {
                ...state,
                playerTotal: action.payload
            }
        }
        case(BACCARAT_DEALER_TOTAL): {
            return {
                ...state,
                dealerTotal: action.payload
            }
        }
        case(BACCARAT_HANDS_RESET): {
            return {
                ...state,
                playerHand: [],
                dealerHand: []
            }
        }
        case(BACCARAT_DEALER_TURN): {
            const card = action.payload.cards[0];
            if (!card) {
                return {
                    state
                }
            } else {
                let value = 0;
                if (card.value === 'KING' || card.value === 'QUEEN' || card.value === 'JACK') {
                    value = 0;
                } else if (card.value === 'ACE') {
                    value = 1;
                } else {
                    value = Number(card.value);
                }

                if (value > 9) {
                    value = value - 10;
                }

                const newDealerHand = [
                    ...state.dealerHand,
                    {
                        image: card.image,
                        value: value,
                        suit: card.suit,
                        code: card.code
                    }
                ]

                return {
                    ...state,
                    dealerHand: newDealerHand,
                    lastCard: value
                }
            }
        }
        case(BACCARAT_PLAYER_TURN): {
            const card = action.payload.cards[0];
            if (!card) {
                return {state};
            } else {
                let value = 0;
                if (card.value === 'KING' || card.value === 'QUEEN' || card.value === 'JACK') {
                    value = 0;
                } else if (card.value === 'ACE') {
                    value = 1;
                } else {
                    value = Number(card.value);
                }

                if (value > 9) {
                    value = value - 10;
                }

                const newPlayerHand = [
                    ...state.playerHand,
                    {
                        image: card.image,
                        value: value,
                        suit: card.suit,
                        code: card.code
                    }
                ]

                return {
                    ...state,
                    playerHand: newPlayerHand,
                    lastCard: value
                }
            }
        }
    }
    return state;
}

const initialBlackJackState = {
    deck: null,
    playerHand: [],
    dealerHand: [],
    playerTotal: 0,
    dealerTotal: 0
}
function blackjack(state = initialBlackJackState, action) {
    switch(action.type) {
        case(SHUFFLE): {
            return {
                ...state,
                deck: action.payload.deck_id
            }
        }
        case(BLACKJACK_PLAYER_DRAW): {
            const card = action.payload.cards[0];
            let value = 0;
            if (card.value === 'KING' || card.value === 'QUEEN' || card.value === 'JACK') {
                value = 10;
            } else if (card.value === 'ACE') {
                value = 'ACE';
            } else {
                value = Number(card.value);
            }
            const newPlayerHand = [
                ...state.playerHand,
                {
                    image: card.image,
                    code: card.code,
                    value: value
                }
            ]
            return {
                ...state,
                playerHand: newPlayerHand
            }
        }
        case(BLACKJACK_DEALER_DRAW): {
            const card = action.payload.cards[0];
            let value = 0;
            if (card.value === 'KING' || card.value === 'QUEEN' || card.value === 'JACK') {
                value = 10;
            } else if (card.value === 'ACE') {
                value = 'ACE';
            } else {
                value = Number(card.value);
            }
            const newDealerHand = [
                ...state.dealerHand,
                {
                    image: card.image,
                    code: card.code,
                    value: value
                }
            ]
            return {
                ...state,
                dealerHand: newDealerHand
            }
        }
    }
    return state;
}

export default combineReducers({baccarat, blackjack});