/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { ethers } from 'ethers';
// import { FhenixClient } from 'fhenixjs';
import { ethers } from "ethers";
import { FhenixClient, EncryptedType, EncryptedUint8 } from 'fhenixjs';

// const provider = new BrowserProvider(window.ethereum);

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const client = new FhenixClient({provider});

import styles from '../styles';
import { ActionButton, Alert, Card, GameInfo, PlayerInfo } from '../components';
import { useGlobalContext } from '../context';
import { attack, attackSound, defense, defenseSound, player01 as player01Icon, player02 as player02Icon } from '../assets';
import { playAudio } from '../utils/animation.js';

const Battle = () => {
  const { contract, gameData, battleGround, walletAddress, setErrorMessage, showAlert, setShowAlert, player1Ref, player2Ref } = useGlobalContext();
  const [player2, setPlayer2] = useState({});
  const [player1, setPlayer1] = useState({});
  const { battleName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPlayerInfo = async () => {
      try {
        let player01Address = null;
        let player02Address = null;

        if (gameData.activeBattle.players[0].toLowerCase() === walletAddress.toLowerCase()) {
          player01Address = gameData.activeBattle.players[0];
          player02Address = gameData.activeBattle.players[1];
        } else {
          player01Address = gameData.activeBattle.players[1];
          player02Address = gameData.activeBattle.players[0];
        }

        const p1TokenData = await contract.getPlayerToken(player01Address);
        // console.log(p1TokenData);
        const player01 = await contract.getPlayer(player01Address);
        console.log(player01);
        const player02 = await contract.getPlayer(player02Address);
        console.log(player02);
        // console.log((Number(p1TokenData.attackStrength).toString().slice(0, 17)));
        // console.log((Number(Number(p1TokenData.attackStrength).toString().slice(0, 17))));
        const p1Att = Number(Number(p1TokenData.attackStrength).toString().slice(0, 4));
        // console.log(p1Att);
        // console.log("hai");
        const p1Def = Number(Number(p1TokenData.defenseStrength).toString().slice(0, 4));
        // console.log(p1Def);
        const p1H = Number(Number(player01.playerHealth).toString().slice(0, 4));
        // console.log(p1H);
        const p1M = Number(Number(player01.playerMana).toString().slice(0, 4));
        // console.log(p1M);
        const p2H = Number(Number(player02.playerHealth).toString().slice(0, 4));
        // console.log(p2H);
        const p2M = Number(Number(player02.playerMana).toString().slice(0, 4));
        // console.log(p2M);

        setPlayer1({ ...player01, att: p1Att, def: p1Def, health: p1H, mana: p1M });
        setPlayer2({ ...player02, att: 'X', def: 'X', health: p2H, mana: p2M });
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
// console.log(gameData.activeBattle);
    if (contract && gameData.activeBattle) getPlayerInfo();
  }, [contract, gameData, battleName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!gameData?.activeBattle) navigate('/');
    }, [2000]);

    return () => clearTimeout(timer);
  }, []);

  const makeAMove = async (choice) => {
    playAudio(choice === 1 ? attackSound : defenseSound);

    const resultUint8 = await client.encrypt_uint8(choice);
    try {
      await contract.attackOrDefendChoice(resultUint8, battleName, { gasLimit: 799999 });

      setShowAlert({
        status: true,
        type: 'info',
        message: `Initiating ${choice === 1 ? 'attack' : 'defense'}`,
      });
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className={`${styles.flexBetween} ${styles.gameContainer} ${battleGround}`}>
      {showAlert?.status && <Alert type={showAlert.type} message={showAlert.message} />}

      <PlayerInfo player={player2} playerIcon={player02Icon} mt />

      <div className={`${styles.flexCenter} flex-col my-10`}>
        <Card
          card={player2}
          title={player2?.playerName}
          cardRef={player2Ref}
          playerTwo
        />

        <div className="flex items-center flex-row">
          <ActionButton
            imgUrl={attack}
            handleClick={() => makeAMove(1)}
            restStyles="mr-2 hover:border-yellow-400"
          />

          <Card
            card={player1}
            title={player1?.playerName}
            cardRef={player1Ref}
            restStyles="mt-3"
          />

          <ActionButton
            imgUrl={defense}
            handleClick={() => makeAMove(2)}
            restStyles="ml-6 hover:border-red-600"
          />
        </div>
      </div>

      <PlayerInfo player={player1} playerIcon={player01Icon} />

      <GameInfo />
    </div>
  );
};

export default Battle;
