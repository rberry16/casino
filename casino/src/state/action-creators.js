import axios from 'axios';
import { BACCARAT_SHUFFLE, BACCARAT_PLAYER_TOTAL, BACCARAT_DEALER_TOTAL, DEALER_DRAW, PLAYER_DRAW } from './action-types';


export function baccaratShuffle () {
    return function (dispatch) {
        axios.get('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
            .then(res => {
                dispatch({type: BACCARAT_SHUFFLE, payload: res.data});
            })
            .catch(err => {
                console.error(err);
            })
    }
}

export function playerDraw (deck_id) {
    return function (dispatch) {
        axios.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
            .then(res => {
                dispatch({type: PLAYER_DRAW, payload: res.data});
            })
            .catch(err => {
                console.error(err);
            })
    }
}

export function dealerDraw (deck_id) {
    return function (dispatch) {
        axios.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
            .then(res => {
                dispatch({type: DEALER_DRAW, payload: res.data});
            })
            .catch(err => {
                console.error(err);
            })
    }
}

export function baccaratPlayerTotal (hand) {
    return function (dispatch) {
        let total = 0;
    hand.forEach(card => {
        total = total + card.value;
    });
    if (total > 9) {
        total = total - 10;
    }
    dispatch({type: BACCARAT_PLAYER_TOTAL, payload: total})
    }
}

export function baccaratDealerTotal (hand) {
    return function (dispatch) {
        let total = 0;
    hand.forEach(card => {
        total = total + card.value;
    });
    if (total > 9) {
        total = total - 10;
    }
    dispatch({type: BACCARAT_DEALER_TOTAL, payload: total})
    }
}