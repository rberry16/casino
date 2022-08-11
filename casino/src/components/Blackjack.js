import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {shuffle, blackjackPlayerDraw, blackjackDealerDraw, blackjackPlayerTotal, blackjackDealerTotal, blackjackHandsReset} from '../state/action-creators';

const Blackjack = (props) => {
    const {shuffle, dealerHand, 
           playerHand, dealerTotal, 
           playerTotal, blackjackPlayerDraw,
           blackjackDealerDraw, blackjackPlayerTotal,
           blackjackDealerTotal, blackjackHandsReset,
           deck
        } = props;

    useEffect(() => {
        shuffle();
    }, [])//eslint-disable-line

    useEffect(() => {
        blackjackPlayerTotal(playerHand);
    }, [playerHand])//eslint-disable-line

    useEffect(() => {
        blackjackDealerTotal(dealerHand)
    }, [dealerHand])//eslint-disable-line

    const newGame = () => {
        blackjackHandsReset();
        setTimeout(blackjackPlayerDraw, 500, deck);
        setTimeout(blackjackDealerDraw, 1000, deck);
        setTimeout(blackjackPlayerDraw, 1500, deck);
        setTimeout(blackjackDealerDraw, 2000, deck);
    }

    const hit = () => {
        setTimeout(blackjackPlayerDraw, 500, deck);
    }

    return (
        <div id='wrapper'>
            {
                deck ? (
                    <>
                        <div id='dealer'>
                            <h3>{`Dealer Total: ${dealerTotal}`}</h3>
                            {dealerHand.map(card => {
                                return <img src={card.image} alt={card.code} />
                            })}
                        </div>
                        <div id='player'>
                            <h3>{`Player Total: ${playerTotal}`}</h3>
                            {playerHand.map(card => {
                                return <img src={card.image} alt={card.code} />
                            })}
                        </div>
                        <button onClick={newGame}>New</button>
                        <button onClick={hit}>Hit</button>
                    </>
                ) : 'loading game...'
            }
        </div>
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

export default connect(mapStateToProps, {shuffle, blackjackPlayerDraw, blackjackDealerDraw, blackjackPlayerTotal, blackjackDealerTotal, blackjackHandsReset})(Blackjack);