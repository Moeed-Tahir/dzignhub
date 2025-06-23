import NewPass from '@/components/auth/NewPass'
import React from 'react'
import { Suspense } from 'react'

const page = () => {
  return  (
    <Suspense fallback={<div>Loading...</div>}>
    <NewPass />
    </Suspense>
  )
}

export default page