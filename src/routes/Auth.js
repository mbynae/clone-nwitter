import React, { useState } from 'react';
import { authService } from 'fbase';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');
    // const [login, setLogin] = useState({
    //     email: '',
    //     password: '',
    // });
    // const { email, password } = login;

    //input박스에 글자 입력시 state에 저장
    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
        // setLogin({
        //     ...login,
        //     [name]: value,
        // });
    };

    //submit 버튼을 클릭 시 입력한 state로 계정을 생성하거나 로그인 하는 기능
    const onSubmit = async (e) => {
        e.preventDefault();
        let data;
        try {
            if (newAccount) {
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    //버튼 클릭 시 계정생성 버튼 <-> 로그인 버튼 전환하기
    const toggleAccount = () => setNewAccount((prev) => !prev);

    // 소셜 로그인 버튼
    const socialClick = async (e) => {
        const { name } = e.target;
        //provider을 생성해서 소셜 로그인 팝업창을 호출 시 호출 할 수 있도록 한다.
        let provider;
        if (name === 'google') {
            provider = new GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new GithubAuthProvider();
        }
        //소셜 로그인 팝업창 호출하는 함수. 클릭 시 팝업 창이 호출될 때까지 기다리도록 동기화 시켜준다.
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" value={email} placeholder="이메일을 작성해주세요." required onChange={onChange} />
                <input type="password" name="password" value={password} placeholder="비밀번호를 작성해주세요." required onChange={onChange} />
                <input type="submit" value={newAccount ? 'Create Account' : 'Sign In'} />
                {error}
            </form>
            <span onClick={toggleAccount} style={{ cursor: 'pointer' }}>
                {newAccount ? 'Sign In' : 'Create Account'}
            </span>
            <div>
                <button onClick={socialClick} name="google">
                    구글로 로그인
                </button>
                <button onClick={socialClick} name="github">
                    깃허브로 로그인
                </button>
            </div>
        </div>
    );
};

export default Auth;
