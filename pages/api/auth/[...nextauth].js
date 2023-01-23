import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import {connectDataBase} from "../../../lib/db";
import {hashPassword, verifyPassword} from "../../../lib/auth";


export default NextAuth({
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const db = await connectDataBase();
                const collection = db.collection('users');

                const user = await collection.findOne({email: credentials.email});

                console.log(user)
                console.log(credentials.email)
                console.log(credentials)
                if (!user) {
                    throw new Error("유정벗어")
                }

                const pw = "a";
                const aa = await hashPassword(pw, 12);
                const newVar = await verifyPassword(credentials.password, user.password);
                if (!newVar) {
                    throw new Error("비번틀려")
                }

                //jwt tk 생성해줌 ㅋㅋ
                return {email: credentials.email}
            },
        })
    ],
})