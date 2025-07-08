import {useState,useEffect} from "react";
import Board from "./Board";
import GameOver from "./gameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import gameOverSound from '../sound/soundover.wav';
import clickSound from '../sound/soundclick.wav';
const gos = new Audio(gameOverSound);
gos.volume = 0.2;
const click = new Audio(clickSound);
click.volume= 0.5;

const PLAYER_X ="X";
const PLAYER_O ="O";

const winningCombinations=[
    {combo:[0,1,2],strikeClass:"strike-row-1"},
    {combo:[3,4,5],strikeClass:"strike-row-2"},
    {combo:[6,7,8],strikeClass:"strike-row-3"},
    {combo:[0,3,6],strikeClass:"strike-column-1"},
    {combo:[0,4,8],strikeClass:"strike-diagonal-1"},
    {combo:[2,4,6],strikeClass:"strike-diagonal-2"},
    {combo:[1,4,7],strikeClass:"strike-column-2"},
    {combo:[3,5,8],strikeClass:"strike-column-3"},

]

function checkWinner(tiles,setStrikeClass,setGameState){
    for(const{combo,strikeClass} of winningCombinations){
        const tileval1 = tiles[combo[0]];
        const tileval2 = tiles[combo[1]];
        const tileval3 = tiles[combo[2]];
        if(tileval1 !== null && tileval1===tileval2 && tileval1===tileval3 ){
            setStrikeClass(strikeClass);
            if(tileval1===PLAYER_O){
                setGameState(GameState.playerOWins); 
            }
            else{
                setGameState(GameState.playerXWins);
            }return;    
        }
    }

const areAllTilesFilledIn = tiles.every((tile)=>tile !==null);
if(areAllTilesFilledIn){
    setGameState(GameState.draw);
}}
function TicTacToe() {
    const [tiles,setTiles] = useState(Array(9).fill(null));
    const [playerTurn,setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass,setStrikeClass] =useState();
    const [gameState,setGameState]=useState(GameState.inProgress );
    const handleTileClick = (index)=>{
        if(gameState!==GameState.inProgress){
            return;
        }
        if(tiles[index]!==null){
            return;
        }
        const newTiles =[...tiles];
        newTiles[index]=playerTurn;
        setTiles(newTiles);
        if(playerTurn===PLAYER_X){
            setPlayerTurn(PLAYER_O)
        }else{
            setPlayerTurn(PLAYER_X)
        }
      };
    const handleReset =() =>{
        setGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setStrikeClass(null);
    }
      useEffect(()=>{
        checkWinner(tiles,setStrikeClass,setGameState);
      },[tiles]);
      useEffect(()=>{
        if(tiles.some((tile)=>tile!==null)){
            click.play();
        }
      },[tiles])
      useEffect(()=>{
        if(gameState !==GameState.inProgress){
            gos.play();
        }
      })


  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board playerTurn={playerTurn} tiles = {tiles} onTileClick={handleTileClick} strikeClass ={strikeClass}/>
      <GameOver gameState ={gameState}/>
      <Reset gameState={gameState} onReset = {handleReset}/>
    </div>
  );
}
export default TicTacToe;
