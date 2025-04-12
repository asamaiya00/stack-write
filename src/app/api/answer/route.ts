import { databases, users } from '@/models/server/config'
import { answerCollection, db } from '@/models/server/contants'
import { NextRequest, NextResponse } from 'next/server'
import { ID } from 'node-appwrite'
import { UserPrefs } from '@/store/auth'

export const POST = async (request: NextRequest) => {
  try {
    const { answer, authorId, questionId } = await request.json()
    const response = await databases.createDocument(
      db,
      answerCollection,
      ID.unique(),
      {
        content: answer,
        authorId,
        questionId,
      }
    )

    const prefs = await users.getPrefs<UserPrefs>(authorId)
    await users.updatePrefs<UserPrefs>(authorId, {
      reputation: Number(prefs.reputation) + 1,
    })

    return NextResponse.json(response, {
      status: 201,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Error creating answer' },
      { status: error?.status || error?.code || 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const { answerId } = await request.json()
  try {
    const answer = await databases.getDocument(db, answerCollection, answerId)

    const response = await databases.deleteDocument(
      db,
      answerCollection,
      answerId
    )
    const prefs = await users.getPrefs<UserPrefs>(answer.authorId)
    await users.updatePrefs<UserPrefs>(answer.authorId, {
      reputation: Number(prefs.reputation) - 1,
    })
    return NextResponse.json(response, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Error deleting answer' },
      { status: error?.status || error?.code || 500 }
    )
  }
}
