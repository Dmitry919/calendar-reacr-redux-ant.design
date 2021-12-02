import React, {FC, useEffect} from "react";
import AppRoutes from "./components/AppRoutes";
import Navbar from "./components/Navbar";
import './App.css'
import {Layout} from "antd";
import {useAction} from "./hooks/useActions";
import {IUser} from "./model/IUser";

const App: FC = () => {
    const {setUser, setIsAuth} = useAction();

    useEffect(() => {
        if(localStorage.getItem('auth')) {
            setUser({username: localStorage.getItem('username' || '')} as IUser)
            setIsAuth(true)
        }
    }, [])

    return (
        <Layout>
            <Navbar/>
            <Layout.Content>
                <AppRoutes/>
            </Layout.Content>
        </Layout>
    );
};

export default App;
