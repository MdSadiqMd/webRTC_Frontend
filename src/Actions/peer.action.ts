import { ADD_PEER, REMOVE_PEER } from "../constants/constants";

export const addPeerAction = (peerId: string, stream: MediaStream) => ({
    type: ADD_PEER,
    payload: { peerId, stream }
});

export const removePeerAction = (peerId: string) => ({
    type: REMOVE_PEER,
    payload: { peerId }
});