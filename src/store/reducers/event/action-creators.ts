import {EventActionEnum, setEventsActions, setGuestsAction} from "./types";
import {IEvent} from "../../../model/IEvent";
import {IUser} from "../../../model/IUser";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";


export const EventActionCreator = {
    setEvents: (payload: IEvent[]): setEventsActions => ({type: EventActionEnum.SET_EVENTS, payload}),
    setGuests: (payload: IUser[]): setGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUsers();
            dispatch(EventActionCreator.setGuests(response.data))

        } catch (e) {
            console.log(e)
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            json.push(event)
            dispatch(EventActionCreator.setEvents(json))
            localStorage.setItem('events', JSON.stringify(json))
        } catch (e) {
            console.log(e)
        }
    },
    fetchEvent: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            const currentUserEvent = json.filter(ev => ev.author === username || ev.guest === username)
            dispatch(EventActionCreator.setEvents(currentUserEvent))
        } catch (e) {
            console.log(e)
        }

    }
}