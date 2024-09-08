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
    const navigate = useNavigate();
    const [user, setUser] = useState<Peer>();
    const [stream, setStream] = useState<MediaStream>();

    const fetchParticipants = ({ roomId, participants }: IRoomParams) => {
        console.log(roomId, participants);
    };

    const fetchUserFeed = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        setStream(stream);
    };

    useEffect(() => {
        const userId = UUIDv4();
        const newPeer = new Peer(userId);

        setUser(newPeer);
        fetchUserFeed();

        const enterRoom = ({ roomId }: { roomId: string; }) => {
            navigate(`/room/${roomId}`);
        };

        socket.on('room-created', enterRoom);
        socket.on('get-users', fetchParticipants);
    }, []);

    return (
        <SocketContext.Provider value={{ socket, user, stream }}>
            {children}
        </SocketContext.Provider>
    );
};