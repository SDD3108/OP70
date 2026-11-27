import React from 'react'
import SignUpPageBuilder from '@/src/pageBuilders/SignUpPageBuilder'

const SignUpPage = async({searchParams}) => {
  const {next} = await searchParams;
  return (
    <>
      <SignUpPageBuilder next={next == "/checkout" ? "/checkout" : "/settings/profile"}/>
    </>
  )
}

export default SignUpPage
