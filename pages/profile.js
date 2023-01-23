import UserProfile from '../components/profile/user-profile';
import {getSession} from "next-auth/client";

function ProfilePage() {
    return <UserProfile/>;
}

export async function getServerSideProps(req, res) {
    const session = await getSession(req);

    console.log(session)

    if (!session) {
        return {
            redirect: {
                destination: '/auth', permanent: false,
            }
        }
    }

    return {props: {session}}
}

export default ProfilePage;
