import { useEffect, useState } from "react";
import { Chessboard } from "../components/chessboard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import { Button } from "../components/button";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());

    useEffect(() => {
        if (!socket) {
            return;
        }

        const handleMessage = (event: { data: string; }) => {
            const message = JSON.parse(event.data);
            console.log(message);

            switch (message.type) {
                case INIT_GAME:
                    const newChess = new Chess();
                    setBoard(newChess.board());
                    console.log("Game INITIALIZED");
                    break;
                case MOVE:
                    const move = message.payload;
                    if (chess.move(move)) {
                        setBoard(chess.board());
                        console.log("Move made:", move);
                    } else {
                        console.log("Invalid move:", move);
                    }
                    break;
                case GAME_OVER:
                    console.log("GAME OVER");
                    break;
                default:
                    console.log("Unknown message type");
            }
        };

        socket.addEventListener("message", handleMessage);

        return () => {
            socket.removeEventListener("message", handleMessage);
        };
    }, [socket, chess]);

    if (!socket) return <div>Connecting...</div>;

    return (
        <div>
            <div>
                <Chessboard chess={chess} setBoard={setBoard} socket={socket} board={board} />
            </div>
            <Button onClick={() => {
                socket.send(JSON.stringify({ type: INIT_GAME }));
            }}>
                Play now
            </Button>
        </div>
    );
};
