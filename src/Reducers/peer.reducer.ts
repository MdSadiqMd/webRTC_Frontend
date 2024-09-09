import { ADD_PEER, REMOVE_PEER } from "../constants/constants";
import { PeerState, PeerAction } from "../types/IPeer.types";

export const peerReducer = (state: PeerState, action: PeerAction) => {
    switch (action.type) {
        case ADD_PEER:
            return {
                ...state,
                [action.payload.peerId]: {
                    stream: action.payload.stream
                }
            };
        case REMOVE_PEER:
            const { [action.payload.peerId]: removedPeer, ...restState } = state;
            return {
                ...restState
            };
        default:
            return { ...state };
    }
};