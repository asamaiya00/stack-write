import { createAnswerCollection } from './answers.collection'
import createCommentCollection from './comments.collection'
import { databases } from './config'
import { db } from './contants'
import { createQuestionCollection } from './questions.collection'
import { getOrCreateStorage } from './storageSetup'
import createVoteCollection from './votes.collection'

export default async function getOrCreateDatabase() {
  try {
    await databases.get(db)
    console.log('Database exists')
  } catch (error) {
    try {
      await databases.create(db, db)
      console.log('Creating database...')
      Promise.all([
        createAnswerCollection(),
        createQuestionCollection(),
        createVoteCollection(),
        createCommentCollection(),
        getOrCreateStorage(),
      ]).then(() => {
        console.log('Database created successfully!')
      })
    } catch (error) {
      console.error('Error creating database:', error)
    }
  }
  return databases
}
