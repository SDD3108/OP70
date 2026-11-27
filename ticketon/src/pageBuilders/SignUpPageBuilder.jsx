import AuthForm from "@/src/feature/auth/AuthForm";

const SignUpPageBuilder = ()=>{
  return (
    <>
      <div className="mx-auto grid min-h-[620px] max-w-7xl place-items-center px-4 py-12">
        <AuthForm mode="register" />
      </div>
    </>
  );
}

export default SignUpPageBuilder;
