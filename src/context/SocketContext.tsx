import SocketIOClient from 'socket.io-client';
import { createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { SOCKET_SERVER } from '../constants/constants';
import { IProps } from '../types/IProps.types';

export const SocketContext = createContext<any | null>(null);
const socket = SocketIOClient(SOCKET_SERVER, {
    withCredentials: false,
    transports: ['polling', 'websocket']
});

export const SocketProvider: React.FC<IProps> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const enterRoom = ({ roomId }: { roomId: string; }) => {
            navigate(`/room/${roomId}`);
        };
        socket.on('room-created', enterRoom);
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};