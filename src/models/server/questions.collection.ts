import { IndexType, Permission } from 'node-appwrite'
import { databases } from './config'
import { db, questionCollection } from './contants'

export async function createQuestionCollection() {
  await databases.createCollection(db, questionCollection, questionCollection, [
    Permission.read('any'),
    Permission.read('users'),
    Permission.write('users'),
    Permission.create('users'),
    Permission.delete('users'),
  ])
  console.log('Question collection created successfully!')
  await Promise.all([
    databases.createStringAttribute(db, questionCollection, 'title', 255, true),
    databases.createStringAttribute(
      db,
      questionCollection,
      'authorId',
      255,
      true
    ),
    databases.createStringAttribute(
      db,
      questionCollection,
      'content',
      10240,
      true
    ),
    databases.createStringAttribute(
      db,
      questionCollection,
      'tags',
      255,
      true,
      undefined,
      true
    ),
    databases.createStringAttribute(
      db,
      questionCollection,
      'attachmentId',
      255,
      false
    ),
  ])
  console.log('Attributes created successfully!')

  await Promise.all([
    databases.createIndex(
      db,
      questionCollection,
      'title',
      IndexType.Fulltext,
      ['title'],
      ['asc']
    ),
    databases.createIndex(
      db,
      questionCollection,
      'content',
      IndexType.Fulltext,
      ['content'],
      ['asc']
    ),
  ])
  console.log('Indexes created successfully!')
}
