import React from 'react'
import SignInPageBuilder from '@/src/pageBuilders/SignInPageBuilder'

const SignInPage = async({searchParams}) => {
  const {next} = await searchParams
  return (
    <>
      <SignInPageBuilder next={next == "/checkout" ? "/checkout" : "/settings/profile"}/>
    </>
  )
}

export default SignInPage
