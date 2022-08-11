import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {shuffle} from '../state/action-creators';

const Blackjack = (props) => {
    const {shuffle} = props;

    useEffect(() => {
        shuffle();
    }, [])//eslint-disable-line

    return (
        <h3>Blackjack</h3>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state,
        deck: state.blackjack.deck,
        playerHand: state.blackjack.playerHand,
        dealerHand: state.blackjack.dealerHand,
        playerTotal: state.blackjack.playerTotal,
        dealerTotal: state.blackjack.dealerTotal
    }
}

export default connect(mapStateToProps, {shuffle})(Blackjack);