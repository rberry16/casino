import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import { shuffle, playerDraw, dealerDraw, baccaratPlayerTotal, baccaratDealerTotal, handsReset, baccaratPlayerTurn, baccaratDealerTurn } from '../state/action-creators'

const Baccarat = (props) => {
    const {
        deck, 
        playerHand, 
        dealerHand, 
        playerTotal, 
        dealerTotal,
        playerDraw,
        dealerDraw,
        shuffle,
        baccaratPlayerTotal,
        baccaratDealerTotal,
        handsReset,
        baccaratPlayerTurn,
        baccaratDealerTurn,
        lastCard
    } = props;

    const startGame = () => {
        handsReset();
        setTimeout(playerDraw, 500, deck.deck_id);
        setTimeout(dealerDraw, 1000, deck.deck_id);
        setTimeout(playerDraw, 1500, deck.deck_id);
        setTimeout(dealerDraw, 2000, deck.deck_id);
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

export default connect(mapStateToProps, {shuffle, playerDraw, dealerDraw, baccaratPlayerTotal, baccaratDealerTotal, handsReset, baccaratPlayerTurn, baccaratDealerTurn})(Baccarat);