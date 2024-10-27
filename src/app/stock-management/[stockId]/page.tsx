'use client'
import React from 'react'
import { useParams } from 'next/navigation'

const page = () => {
  const {stockId} = useParams();
  return (
    <div>stockId: {stockId}</div>
  )
}

export default page