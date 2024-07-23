import SocialLogin from '@/components/auth/socialLogin';
import SignInOrUp from '@/components/auth/SignInUp';
import AuthForm from '@/components/auth/AuthForm';

const SignInPage = () => {
  return (
    <div className="w-full h-[calc(100vh-5rem)] flex justify-center">
      <div className="border-4 rounded-md w-96 h-[70%] p-4 flex flex-col gap-8 mt-20">
        <SignInOrUp />
        <SocialLogin />
        <AuthForm />
      </div>
    </div>
  );
};

export default SignInPage;
