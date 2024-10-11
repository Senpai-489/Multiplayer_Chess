import { Color, PieceSymbol, Square } from "chess.js"
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const Chessboard=( { chess, board, socket, setBoard}:{
  setBoard:any;
  chess:any;
  board:({
    square: Square;
    type: PieceSymbol;
    color: Color;
  }|null)[][];
  socket:WebSocket;
})=>{
    const [from,setFrom]= useState<Square|null>(null);
    const [to,setTo]= useState<Square|null>(null);
    return <div className="text-white-200 inline">
     {
      board.map((row,i)=>{
        return <div key={i} className="flex">
          {row.map((square,j)=>{
            const squareRepresent = String.fromCharCode(97+(j%8))+""+(8-i)as Square;
            return <div onClick={()=>{
              if(!from){
                setFrom(squareRepresent);
              }else{
                socket.send(JSON.stringify({
                  type:MOVE,
                  payload:{
                    move:{
                      from,
                      to: squareRepresent
                    }
                  }
                }))
                setFrom(null)
                chess.move({
                  from,
                  to:squareRepresent
                });
                setBoard(chess.board());
                console.log({
                  from,
                  to:squareRepresent
                })
              }
            }

            } key={j} className={`w-16 h-16 ${(i+j)%2==0?'bg-sky-500':'bg-sky-800'}`}>
              <div className="w-full justify-center flex">
              {square ? <img className="w-6 m-4" src={`${square?.color==="b"?square?.type:`${square?.type?.toUpperCase()} copy`}.png`} />:null}
              </div>            
            </div>
          })}
          </div>
      })
     }   
  </div>
}