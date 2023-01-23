import {getSession} from "next-auth/client";
import {connectDataBase} from "../../../lib/db";
import {hashPassword, verifyPassword} from "../../../lib/auth";

export default async function handler(req, res) {
    if (!req.method === 'PATCH') return;

    const session = await getSession({req});

    if (!session) {
        res.status(401).json({message: 'Not authenticated'})
        return;
    }

    const {email} = session.user;
    const {oldPassword, newPassword} = req.body;

    const db = await connectDataBase();
    const collection = db.collection('users');

    const user = await collection.findOne({email});
    if (!user) {
        res.status(404).json({message: '없어'})
        return;
    }

    console.log(oldPassword)
    if (!await verifyPassword(oldPassword, user.password)) {
        res.status(404).json({message: '비틀'})
        return;
    }

    const newHashedPwd = await hashPassword(newPassword);
    const password = await collection.update({email}, {$set: {password: newHashedPwd}});

    res.status(200).json({message: '성공' + password})


}