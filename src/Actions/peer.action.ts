import { ADD_PEER, REMOVE_PEER } from "../constants/constants";
import { PeerAction } from "../types/IPeer.types";

export const addPeerAction = (peerId: string, stream: MediaStream): PeerAction => ({
    type: ADD_PEER,
    payload: { peerId, stream }
});

export const removePeerAction = (peerId: string): PeerAction => ({
    type: REMOVE_PEER,
    payload: { peerId }
});