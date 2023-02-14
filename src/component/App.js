import React, { useEffect, useState } from 'react';
import AppRouter from 'component/AppRouter';
import { authService } from 'fbase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const App = () => {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);

    //파이어베이스가 실행된 후 유저 정보를 가져올 수 있도록 설정
    useEffect(() => {
        const auth = getAuth();
        //onAuthStateChanged는 유저의 변화를 감지하는 함수(회원가입이나 로그인을 클릭하거나 이미 로그인중이거나 등)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserObj(user);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : 'Initializing...'}
            <footer>&copy;{new Date().getFullYear()} Nwitter</footer>
        </>
    );
};

export default App;
