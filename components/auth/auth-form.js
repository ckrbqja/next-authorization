import {useRef, useState} from 'react';
import classes from './auth-form.module.css';
import {signIn} from "next-auth/client";
import {useRouter} from "next/router";

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);

    async function creatUser(email, password) {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message);
        }
    }

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    const email = useRef();
    const password = useRef();

    const router = useRouter();
    async function submitHandler(event) {
        event.preventDefault();

        const emailVal = email.current.value;
        const passwordVal = password.current.value;
        if (isLogin) {
            const result = await signIn('credentials', {
                redirect: false,
                email:emailVal, password:passwordVal
            });

            if(!result.error)
                await router.replace('/profile');
        } else {
            const result = await creatUser(emailVal, passwordVal);
        }

    }


    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={email}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={password}/>
                </div>
                <div className={classes.actions}>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;
