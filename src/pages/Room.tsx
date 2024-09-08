import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { SocketContext } from "../context/SocketContext";

const Room: React.FC = () => {
    const { id } = useParams();
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.emit('joined-room', { roomId: id });
    }, []);
    
    return (
        <>
            <h1>Room: {id}</h1>
        </>
    );
};

export default Room;