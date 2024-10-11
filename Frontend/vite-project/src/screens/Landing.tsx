import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
export const Landing=()=>{
    const navigate = useNavigate();
    return <div>
        <img className="size-5/12 p-0 m-8 inline" src={'/futuristic_chessboard.jpeg'}></img>
        <h1 className="inline-block text-sky-400 text-6xl size-80 font-mono">Welcome to OneChess</h1>
        <Button onClick={()=>{
            navigate("/game")
        }}>Play</Button>
    </div>
}

export default Landing;