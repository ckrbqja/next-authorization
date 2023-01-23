import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import {connectDataBase} from "../../../lib/db";
import {verifyPassword} from "../../../lib/auth";


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
                const collection = db.collection('user');

                const user = await collection.findOne({email: credentials.email});

                if (!user) {
                    throw new Error("유정벗어")
                }

                if (!await verifyPassword(user.password, credentials.password)) {
                    throw new Error("비번틀려")
                }

                //jwt tk 생성해줌 ㅋㅋ
                return {email}
            },
        })
    ],
})