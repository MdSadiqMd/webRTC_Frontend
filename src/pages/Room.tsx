import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { SocketContext } from "../context/SocketContext";
import UserFeedPlayer from "../components/UserFeedPlayer";
import { JOINED_SOCKET } from "../constants/constants";

const Room: React.FC = () => {
    const { id } = useParams();
    const { socket, user, stream, peers } = useContext(SocketContext);

    useEffect(() => {
        if (user) {
            socket.emit(JOINED_SOCKET, { roomId: id, peerId: user._id });
        }
    }, [id, user, socket]);

    return (
        <>
            <h1>Room: {id}</h1>
            <UserFeedPlayer stream={stream} />
            <div>
                {
                    Object.keys(peers).map((peerId) => (
                        <>
                            <UserFeedPlayer key={peerId} stream={peers[peerId].stream} />
                        </>
                    ))
                }
            </div>
        </>
    );
};

export default Room;