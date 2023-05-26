import { getCollection } from '@/modules/connectDb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collection = await getCollection('settings')
  const settings = await collection.find().toArray()
  
  res.status(200).json(settings[0])
}
