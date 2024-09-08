import { useContext } from "react";

import { SocketContext } from "../context/SocketContext";

const CreateRoom: React.FC = () => {
    const { socket } = useContext(SocketContext);

    const initRoom = () => {
        socket.emit('create-room');
    };

    return (
        <>
            <button className="btn btn-neutral" onClick={initRoom}>
                Create new Room
            </button>
        </>
    );
};

export default CreateRoom;