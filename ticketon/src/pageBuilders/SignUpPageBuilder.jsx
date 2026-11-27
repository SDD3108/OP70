import AuthForm from "@/src/feature/auth/AuthForm";

const SignUpPageBuilder = ({next})=>{
  return (
    <>
      <div className="mx-auto grid min-h-[620px] max-w-7xl place-items-center px-4 py-12">
        <AuthForm mode="register" next={next} />
      </div>
    </>
  )
}

export default SignUpPageBuilder;
