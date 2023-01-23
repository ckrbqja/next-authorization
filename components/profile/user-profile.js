import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import {getSession, useSession} from "next-auth/client";
import {useEffect, useState} from "react";

function UserProfile() {
    // Redirect away if NOT auth
    // const [isLoading, setIsLoading] = useState(true);
    //
    // useEffect(() => {
    //     (async () => {
    //         const session = await getSession();
    //         if (!session) window.location.href = '/auth'
    //         else setIsLoading(false);
    //     })();
    // }, []);
    //
    // if (isLoading) {
    //     return <p className={classes.profile}>Loading...</p>
    // }


    function changePwdHandler(req) {
        fetch('/api/user/change-password',{
            method: 'PATCH',
            body: JSON.stringify(req),
            headers: {
                'Content-Type':'application/json'
            }
        })
    }
    return (
        <section className={classes.profile}>
            <h1>Your User Profile</h1>
            <ProfileForm onChangePwd={changePwdHandler}/>
        </section>
    );
}

export default UserProfile;
