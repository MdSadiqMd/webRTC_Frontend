import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { SocketContext } from "../context/SocketContext";

const Room: React.FC = () => {
    const { id } = useParams();
    const { socket, user } = useContext(SocketContext);

    useEffect(() => {
        if (user) {
            socket.emit('joined-room', { roomId: id, peerId: user._id });
        }
    }, [id, user, socket]);

    return (
        <>
            <h1>Room: {id}</h1>
        </>
    );
};

export default Room;