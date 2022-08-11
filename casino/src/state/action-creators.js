import axios from 'axios';
import { SHUFFLE, BACCARAT_PLAYER_TOTAL, BACCARAT_DEALER_TOTAL, BACCARAT_DEALER_DRAW, BACCARAT_PLAYER_DRAW, BACCARAT_HANDS_RESET, BACCARAT_PLAYER_TURN, BACCARAT_DEALER_TURN } from './action-types';


export function shuffle () {
    return function (dispatch) {
        axios.get('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => {
                dispatch({type: SHUFFLE, payload: res.data});
            })
            .catch(err => {
                console.error(err);
            })
    }
}

export function baccaratPlayerDraw (deck_id) {
    return function (dispatch) {
        axios.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
            .then(res => {
                dispatch({type: BACCARAT_PLAYER_DRAW, payload: res.data});
            })
            .catch(err => {
                console.error(err);
            })
    }
}

export function baccaratDealerDraw (deck_id) {
    return function (dispatch) {
        axios.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
            .then(res => {
                dispatch({type: BACCARAT_DEALER_DRAW, payload: res.data});
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

export function baccaratHandsReset () {
    return function (dispatch) {
        dispatch({type: BACCARAT_HANDS_RESET});
    }
}

export function baccaratDealerTurn (dealerTotal, playerTotal, card, deck_id) {
    return function (dispatch) {
        if (dealerTotal === 3 && card !== 8) {
            axios.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
            .then(res => {
                dispatch({type: BACCARAT_DEALER_TURN, payload: res.data});
            })
            .catch(err => {
                console.error(err);
            })
        } else if (dealerTotal === 4 && card > 1 && card < 8) {
            axios.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
            .then(res => {
                dispatch({type: BACCARAT_DEALER_TURN, payload: res.data});
            })
            .catch(err => {
                console.error(err);
            })
        } else if (dealerTotal === 5 && card > 3 && card < 8) {
            axios.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
            .then(res => {
                dispatch({type: BACCARAT_DEALER_TURN, payload: res.data});
            })
            .catch(err => {
                console.error(err);
            })
        } else if (dealerTotal === 6 && card > 5 && card < 8) {
            axios.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
            .then(res => {
                dispatch({type: BACCARAT_DEALER_TURN, payload: res.data});
            })
            .catch(err => {
                console.error(err);
            })
        } else if (dealerTotal < 3 && playerTotal < 8) {
            axios.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
            .then(res => {
                dispatch({type: BACCARAT_DEALER_TURN, payload: res.data});
            })
            .catch(err => {
                console.error(err);
            })
        } else {
            dispatch({type: BACCARAT_DEALER_TURN, payload: null});
        }
    }
}

export function baccaratPlayerTurn (playerTotal, dealerTotal, deck_id) {
    return function (dispatch) {
        if (dealerTotal < 8 && playerTotal < 6) {
            axios.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
            .then(res => {
                dispatch({type: BACCARAT_PLAYER_TURN, payload: res.data});
            })
            .catch(err => {
                console.error(err);
            })
        } else {
            dispatch({type: BACCARAT_PLAYER_TURN, payload: null});
        }
    }
}

