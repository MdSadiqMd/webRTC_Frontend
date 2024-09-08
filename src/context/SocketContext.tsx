import SocketIOClient from 'socket.io-client';
import { createContext } from 'react';

import { SOCKET_SERVER } from '../constants/constants';
import { IProps } from '../types/IProps.types';

export const SocketContext = createContext<any | null>(null);
const socket = SocketIOClient(SOCKET_SERVER);

export const SocketProvider: React.FC<IProps> = ({ children }) => {
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};