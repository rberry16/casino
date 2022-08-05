import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import { baccaratShuffle, playerDraw, dealerDraw, baccaratPlayerTotal, baccaratDealerTotal } from '../state/action-creators'

const Baccarat = (props) => {
    const {
        deck, 
        playerHand, 
        dealerHand, 
        playerTotal, 
        dealerTotal,
        playerDraw,
        dealerDraw,
        baccaratShuffle,
        baccaratPlayerTotal,
        baccaratDealerTotal
    } = props;

    const startGame = () => {
        playerDraw(deck.deck_id);
        dealerDraw(deck.deck_id);
        playerDraw(deck.deck_id);
        dealerDraw(deck.deck_id);
    }

    useEffect(() => {
        baccaratShuffle();
    }, [])

    useEffect(() => {
        baccaratPlayerTotal(playerHand)
    }, [playerHand])

    useEffect(() => {
        baccaratDealerTotal(dealerHand)
    }, [dealerHand])

    return (
        <div id='wrapper'>
            {
                deck ? (
                    <>
                        <div id='dealer'>
                            <h3>{`Dealer total: ${dealerTotal}`}</h3>
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
                        <button onClick={startGame}>New</button>
                    </>
                ) : 'Loading game...'
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state,
        deck: state.baccarat.deck,
        playerHand: state.baccarat.playerHand,
        dealerHand: state.baccarat.dealerHand,
        playerTotal: state.baccarat.playerTotal,
        dealerTotal: state.baccarat.dealerTotal
    }
}

export default connect(mapStateToProps, {baccaratShuffle, playerDraw, dealerDraw, baccaratPlayerTotal, baccaratDealerTotal})(Baccarat);