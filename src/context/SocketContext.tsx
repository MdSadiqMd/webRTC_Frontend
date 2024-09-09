import SocketIOClient from 'socket.io-client';
import { createContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Peer from 'peerjs';
import { v4 as UUIDv4 } from 'uuid';

import { SOCKET_SERVER, ROOM_SOCKET, USERS_SOCKET, USER_JOINED_SOCKET, READY_SOCKET, CALL_SOCKET, STRAM_SOCKET } from '../constants/constants';
import { IProps } from '../types/IProps.types';
import { IRoomParams } from '../types/IRoomParams.types';
import { peerReducer } from '../Reducers/peer.reducer';
import { addPeerAction } from '../Actions/peer.action';

export const SocketContext = createContext<any | null>(null);
const socket = SocketIOClient(SOCKET_SERVER, {
    withCredentials: false,
    transports: ['polling', 'websocket']
});

export const SocketProvider: React.FC<IProps> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<Peer>();
    const [stream, setStream] = useState<MediaStream>();
    const [peers, dispatch] = useReducer(peerReducer, {});

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
        const newPeer = new Peer(userId, {
            host: "localhost",
            port: 9000,
            path: "/myapp"
        });

        setUser(newPeer);
        fetchUserFeed();

        const enterRoom = ({ roomId }: { roomId: string; }) => {
            navigate(`/room/${roomId}`);
        };

        socket.on(ROOM_SOCKET, enterRoom);
        socket.on(USERS_SOCKET, fetchParticipants);
    }, []);

    useEffect(() => {
        if (!user || !stream) return;

        socket.on(USER_JOINED_SOCKET, ({ peerId }) => {
            const call = user.call(peerId, stream);
            console.log('calling user', peerId);
            call.on(STRAM_SOCKET, () => {
                dispatch(addPeerAction(peerId, stream));
            });
        });

        user.on(CALL_SOCKET, (call) => {
            console.log('receiving a call');
            call.answer(stream);
            call.on(STRAM_SOCKET, () => {
                dispatch(addPeerAction(call.peer, stream));
            });
        });

        socket.emit(READY_SOCKET);
    }, [user, stream]);

    return (
        <SocketContext.Provider value={{ socket, user, stream, peers }}>
            {children}
        </SocketContext.Provider>
    );
};