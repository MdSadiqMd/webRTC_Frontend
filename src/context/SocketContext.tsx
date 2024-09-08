import SocketIOClient from 'socket.io-client';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Peer from 'peerjs';
import { v4 as UUIDv4 } from 'uuid';

import { SOCKET_SERVER } from '../constants/constants';
import { IProps } from '../types/IProps.types';
import { IRoomParams } from '../types/IRoomParams.types';

export const SocketContext = createContext<any | null>(null);
const socket = SocketIOClient(SOCKET_SERVER, {
    withCredentials: false,
    transports: ['polling', 'websocket']
});

export const SocketProvider: React.FC<IProps> = ({ children }) => {
    const [user, setUser] = useState<Peer>();
    const navigate = useNavigate();

    const fetchParticipants = ({ roomId, participants }: IRoomParams) => {
        console.log(roomId, participants);
    };

    useEffect(() => {
        const userId = UUIDv4();
        const newPeer = new Peer(userId);

        setUser(newPeer);

        const enterRoom = ({ roomId }: { roomId: string; }) => {
            navigate(`/room/${roomId}`);
        };

        socket.on('room-created', enterRoom);
        socket.on('get-users', fetchParticipants);
    }, []);

    return (
        <SocketContext.Provider value={{ socket, user }}>
            {children}
        </SocketContext.Provider>
    );
};