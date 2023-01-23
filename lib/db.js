import {MongoClient} from 'mongodb'

export async function connectDataBase() {
    const url = process.env.mongodb_connect_url + '';
    const connect = await MongoClient.connect(url);
    return connect.db();
}