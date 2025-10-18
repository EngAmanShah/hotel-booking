// app/api/contact/route.js
import { dynamoDb } from '@/lib/aws'
import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { nanoid } from 'nanoid'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const timestamp = new Date().toISOString()
    const id = nanoid()

    const params = {
      TableName: 'contactMessages',
      Item: { id, name, email, message, timestamp, read: false },
    }

    await dynamoDb.send(new PutCommand(params))

    return NextResponse.json({ message: 'Message saved successfully' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error saving message' }, { status: 500 })
  }
}
