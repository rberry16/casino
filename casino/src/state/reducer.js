/* eslint-disable default-case */
import { combineReducers } from "redux";
import { BACCARAT_DEALER_TOTAL, BACCARAT_PLAYER_TOTAL, BACCARAT_SHUFFLE, DEALER_DRAW, PLAYER_DRAW } from "./action-types";



const initialBaccaratState = {
    deck: null,
    playerHand: [],
    dealerHand: [],
    playerTotal: 0,
    dealerTotal: 0,
    message: ''
};
function baccarat(state = initialBaccaratState, action) {
    switch(action.type) {
        case(BACCARAT_SHUFFLE): {
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
        case(PLAYER_DRAW): {
            const card = action.payload.cards[0];
            let value = 0;
            if (card.value === 'KING' || card.value === 'Queen' || card.value === 'Jack') {
                value = 0;
            } else if (card.value === 'ACE') {
                value = 1;
            } else {
                value = Number(card.value);
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
                playerHand: newPlayerHand
            }
        }
        case(DEALER_DRAW): {
            const card = action.payload.cards[0];
            let value = 0;
            if (card.value === 'KING' || card.value === 'Queen' || card.value === 'Jack') {
                value = 0;
            } else if (card.value === 'ACE') {
                value = 1;
            } else {
                value = Number(card.value);
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
                dealerHand: newDealerHand
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
    }
    return state;
}

export default combineReducers({baccarat});