import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../model/IUser";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";

export const authActionCreator = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(authActionCreator.setIsLoading(true));
            setTimeout(async () => {
                const response = await UserService.getUsers()
                const mockUser = response.data.find(user => user.username === username && user.password === password)
                if(mockUser) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', mockUser.username)
                    dispatch(authActionCreator.setUser(mockUser))
                    dispatch(authActionCreator.setIsAuth(true))
                } else {
                    dispatch(authActionCreator.setError('Неправильный логин или пароль'))
                }
                dispatch(authActionCreator.setIsLoading(false))
            }, 2000)
        } catch (e) {
            dispatch(authActionCreator.setError('Произошла ошибка'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
            localStorage.removeItem('auth')
            localStorage.removeItem('username')
            dispatch(authActionCreator.setUser({} as IUser))
            dispatch(authActionCreator.setIsAuth(false))
    },
}
