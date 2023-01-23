import AuthForm from '../components/auth/auth-form';
import {useEffect, useState} from "react";
import {getSession} from "next-auth/client";
import {useRouter} from "next/router";

function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  // useEffect(()=>{
  //   (async ()=>{
  //     const session = await getSession();
  //     if(!session) await router.replace('/');
  //     else setIsLoading(false)
  //   })()
  // },[router])
  //
  //
  // if(isLoading)
  //   return <p>Loading...</p>

  return <AuthForm />;
}

export default AuthPage;
