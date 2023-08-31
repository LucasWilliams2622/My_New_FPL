import React,{ createContext, useState, useMemo } from "react";
import moment from 'moment';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const { children } = props;
    const [isLogin, setIsLogin] = useState(true)
    const [infoUser, setInfoUser] = useState({})
    const [idUser, setIdUser] = useState("")
    const [appState, setAppState] = useState(0)
    const [showWebView, setShowWebView] = React.useState(false);

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    const currentDay = moment().format('YYYY-MM-DD');

    const contextValue = useMemo(() => {
        return { isLogin, setIsLogin, infoUser, setInfoUser, idUser, setIdUser,
             currentDay, appState, setAppState,showWebView, setShowWebView };
    }, [isLogin, setIsLogin, infoUser, setInfoUser, idUser, setIdUser, 
        currentDay, appState, setAppState,showWebView, setShowWebView]);
    return (
        <AppContext.Provider
            value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}