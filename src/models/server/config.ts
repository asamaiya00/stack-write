import { Client, Account, Users, Databases, Storage } from 'node-appwrite'

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_API_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
  .setKey(process.env.API_KEY!)

const account = new Account(client)
const databases = new Databases(client)
const storage = new Storage(client)
const users = new Users(client)

export { client, account, databases, storage, users }
