import SocialLogin from '@/components/auth/socialLogin';
import SignInOrUp from '@/components/auth/SignInUp';
import AuthForm from '@/components/auth/AuthForm';

const SignInPage = () => {
  return (
    <div className="border-4 rounded-md w-[40%] h-[70%] p-4 flex flex-col gap-8">
      <SignInOrUp />
      <SocialLogin />
      <AuthForm />
    </div>
  );
};

export default SignInPage;
