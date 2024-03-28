'use server'
import React from 'react'
import Image from 'next/image'
import { getImages } from '@/services/imageService'

export default async function page({params}:{params:{imgeId:string}}) {
  // try {
  //   const imgage =await getImage({id:params.imgeId})
  //   return <Image src={imgage.url} width={450} height={450} alt={imgage.prompt}/>
  // } catch (error) {
  //   return <div>error</div>
  // }
  return <div>error</div>
}
