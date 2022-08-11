import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import { shuffle, baccaratPlayerDraw, baccaratDealerDraw, baccaratPlayerTotal, baccaratDealerTotal, baccaratHandsReset, baccaratPlayerTurn, baccaratDealerTurn } from '../state/action-creators'

const Baccarat = (props) => {
    const {
        deck, 
        playerHand, 
        dealerHand, 
        playerTotal, 
        dealerTotal,
        baccaratPlayerDraw,
        baccaratDealerDraw,
        shuffle,
        baccaratPlayerTotal,
        baccaratDealerTotal,
        baccaratHandsReset,
        baccaratPlayerTurn,
        baccaratDealerTurn,
        lastCard
    } = props;

    const startGame = () => {
        baccaratHandsReset();
        setTimeout(baccaratPlayerDraw, 500, deck.deck_id);
        setTimeout(baccaratDealerDraw, 1000, deck.deck_id);
        setTimeout(baccaratPlayerDraw, 1500, deck.deck_id);
        setTimeout(baccaratDealerDraw, 2000, deck.deck_id);
    }

    const handleFlip = () => {
        baccaratPlayerTurn(playerTotal, dealerTotal, deck.deck_id);
        setTimeout(baccaratDealerTurn, 500, dealerTotal, playerTotal, lastCard, deck.deck_id);
    }

    useEffect(() => {
        shuffle();
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
                        <button onClick={startGame}>New</button>
                        <button onClick={handleFlip}>Flip</button>
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
        dealerTotal: state.baccarat.dealerTotal,
        lastCard: state.baccarat.lastCard
    }
}

export default connect(mapStateToProps, {shuffle, baccaratPlayerDraw, baccaratDealerDraw, baccaratPlayerTotal, baccaratDealerTotal, baccaratHandsReset, baccaratPlayerTurn, baccaratDealerTurn})(Baccarat);