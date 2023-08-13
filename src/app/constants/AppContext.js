import React,{ createContext, useState, useMemo } from "react";
export const AppContext = createContext();
import moment from 'moment';

export const AppProvider = (props) => {
    const { children } = props;
    const [isLogin, setIsLogin] = useState(true)
    const [infoUser, setInfoUser] = useState({})
    const [idUser, setIdUser] = useState("")

    const [appState, setAppState] = useState(0)
    const currentDay = moment().format('YYYY-MM-DD');

    const contextValue = useMemo(() => {
        return { isLogin, setIsLogin, infoUser, setInfoUser, idUser, setIdUser,
             currentDay, appState, setAppState };
    }, [isLogin, setIsLogin, infoUser, setInfoUser, idUser, setIdUser, 
        currentDay, appState, setAppState]);
    return (
        <AppContext.Provider
            value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}