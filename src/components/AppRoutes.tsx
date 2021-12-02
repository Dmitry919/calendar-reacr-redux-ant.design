import React, {FC} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {privateRoutes, publicRoutes, RouteNames} from '../router';
import Login from "../pages/Login";
import Event from "../pages/Event";
import {useTypedSelector} from "../hooks/useTypedSelector";


const AppRoutes: FC = () => {
    const {isAuth} = useTypedSelector(state => state.auth)
    return (

        isAuth ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route path={route.path}
                           children={route.exact}
                           key={route.path}
                           element={<Event />}
                    />
                )}
                <Route  path='*' element={<Navigate to={RouteNames.EVENT} />}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route path={route.path}
                           children={route.exact}
                           key={route.path}
                           element={<Login />}
                    />
                )}
                <Route path='/' element={<Navigate to={RouteNames.LOGIN} />}/>
            </Routes>


    );
};

export default AppRoutes;