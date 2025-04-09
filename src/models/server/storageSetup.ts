import { Permission } from 'node-appwrite'
import { storage } from './config'
import { questionAttachmentBucket } from './contants'

export async function getOrCreateStorage() {
  try {
    await storage.getBucket(questionAttachmentBucket)
    console.log('Bucket exists')
  } catch (error) {
    try {
      storage.createBucket(
        questionAttachmentBucket,
        questionAttachmentBucket,
        [
          Permission.read('any'),
          Permission.read('users'),
          Permission.write('users'),
          Permission.create('users'),
          Permission.delete('users'),
        ],
        false,
        undefined,
        undefined,
        ['jpg', 'png', 'gif', 'jpeg', 'webp', 'heic']
      )
      console.log('Creating bucket...')
      console.log('Bucket connected successfully!')
    } catch (error) {
      console.error('Error creating bucket:', error)
    }
  }
}
