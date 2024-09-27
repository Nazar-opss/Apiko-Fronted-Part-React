'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
//TODO: find a way to delete this out of route
function SettingsComponent() {
  const router = useRouter()
  useEffect(() => {
    router.push('/settings/edit_account')
  }, [])
  return (
    <div>Loading...</div>
  )
}

export default SettingsComponent