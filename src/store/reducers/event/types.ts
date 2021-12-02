import {IEvent} from "../../../model/IEvent";
import {IUser} from "../../../model/IUser";


export interface EventState {
    events: IEvent[];
    guests: IUser[];
}

export enum EventActionEnum {
    SET_GUESTS = 'SET_GUESTS',
    SET_EVENTS = 'SET_EVENTS',
}

export interface setGuestsAction {
    type: EventActionEnum.SET_GUESTS;
    payload: IUser[];
}

export interface setEventsActions {
    type: EventActionEnum.SET_EVENTS;
    payload: IEvent[];
}

export type EventAction = setGuestsAction | setEventsActions