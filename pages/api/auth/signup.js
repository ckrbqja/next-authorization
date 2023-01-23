import {connectDataBase} from "../../../lib/db";
import {hashPassword} from "../../../lib/auth";

export default async function SignUp(req, res) {
    const db = await connectDataBase();

    const collection = db.collection('users');
    const {email, password} = req.body;

    const findOne = await collection.findOne({email});

    if (findOne) {
        res.status(422).json({message: "user already exists"})
        return;
    }

    collection.insertOne({email, password: await hashPassword(password)});

    res.status(201).json({message:'Created Card!'})


};