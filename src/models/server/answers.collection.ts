import { Permission } from 'node-appwrite'
import { databases } from './config'
import { db, answerCollection } from './contants'

export async function createAnswerCollection() {
  await databases.createCollection(db, answerCollection, answerCollection, [
    Permission.read('any'),
    Permission.read('users'),
    Permission.write('users'),
    Permission.create('users'),
    Permission.delete('users'),
  ])
  console.log('Answer collection created successfully!')
  Promise.all([
    databases.createStringAttribute(
      db,
      answerCollection,
      'content',
      10240,
      true
    ),
    databases.createStringAttribute(
      db,
      answerCollection,
      'authorId',
      255,
      true
    ),
    databases.createStringAttribute(
      db,
      answerCollection,
      'questionId',
      255,
      true
    ),
  ])
    .then(() => {
      console.log('Attributes created successfully!')
    })
    .catch((error) => {
      console.error('Error creating attributes:', error)
    })
}
