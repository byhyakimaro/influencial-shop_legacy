import { getCollection } from '@/modules/connectDb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collection = await getCollection('products')
  const products = await collection.find().toArray()

  products.sort((a: any, b: any) => b.dateProduct.getTime() - a.dateProduct.getTime())
  const productRecentFormat = products.filter((product :any) =>{
    if (!product.active) {
      return false
    }
    return true
  }).map((product: any) => {
    return {
      Title: product.Title,
      Code: product["_id"].toString(),
      Image: product.Image,
      Price: product.Price,
      Evaluation: product.Evaluation,
      CountEvaluation: product.CountEvaluation
    }
  })

  products.sort((a: any, b: any) => b.quantitySold - a.quantitySold)
  const productSoldFormat = products.filter((product :any) =>{
    if (!product.active) {
      return false
    }
    return true
  }).map((product: any) => {
    return {
      Title: product.Title,
      Code: product["_id"].toString(),
      Image: product.Image,
      Price: product.Price,
      Evaluation: product.Evaluation,
      CountEvaluation: product.CountEvaluation
    }
  })

  products.sort(() => Math.random() - 0.5)
  const productRecommendedFormat = products.filter((product :any) =>{
    if (!product.active) {
      return false
    }
    return true
  }).map((product: any) => {
    return {
      Title: product.Title,
      Code: product["_id"].toString(),
      Image: product.Image,
      Price: product.Price,
      Evaluation: product.Evaluation,
      CountEvaluation: product.CountEvaluation
    }
  })

  res.status(200).json({
    recentProducts: productRecentFormat,
    bestSell: productSoldFormat,
    recommended: productRecommendedFormat
  })
}
