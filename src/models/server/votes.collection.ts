import { Permission } from 'node-appwrite'
import { voteCollection, db } from './contants'
import { databases } from './config'

export default async function createVoteCollection() {
  // Creating Collection
  await databases.createCollection(db, voteCollection, voteCollection, [
    Permission.create('users'),
    Permission.read('any'),
    Permission.read('users'),
    Permission.update('users'),
    Permission.delete('users'),
  ])
  console.log('Vote Collection Created')

  // Creating Attributes
  await Promise.all([
    databases.createStringAttribute(db, voteCollection, 'content', 10240, true),
    databases.createEnumAttribute(
      db,
      voteCollection,
      'type',
      ['answer', 'question'],
      true
    ),
    databases.createEnumAttribute(
      db,
      voteCollection,
      'voteStatus',
      ['upvote', 'downvote'],
      true
    ),
    databases.createStringAttribute(db, voteCollection, 'votedById', 255, true),
  ])
  console.log('vote Attributes Created')
}
