import { useContext } from "react";

import { SocketContext } from "../context/SocketContext";
import { CREATE_SOCKET } from "../constants/constants";

const CreateRoom: React.FC = () => {
    const { socket } = useContext(SocketContext);

    const initRoom = () => {
        socket.emit(CREATE_SOCKET);
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