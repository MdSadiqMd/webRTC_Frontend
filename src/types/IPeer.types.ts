import { ADD_PEER, REMOVE_PEER } from "../constants/constants";

export type PeerState = Record<string, { stream: MediaStream; }>;

export type PeerAction = {
    type: typeof ADD_PEER,
    payload: { peerId: string, stream: MediaStream; };
} | {
    type: typeof REMOVE_PEER,
    payload: { peerId: string; };
};