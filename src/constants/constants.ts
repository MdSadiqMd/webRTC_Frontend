const SOCKET_SERVER = import.meta.env.VITE_SOCKET_SERVER || 3000;
const ROOM_SOCKET = 'room-created';
const USERS_SOCKET = 'get-users';
const JOINED_SOCKET = 'joined-room';
const CREATE_SOCKET = 'create-room';

export {
    SOCKET_SERVER,
    ROOM_SOCKET,
    USERS_SOCKET,
    JOINED_SOCKET,
    CREATE_SOCKET
};