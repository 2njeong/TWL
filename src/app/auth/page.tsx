import SocialLogin from '@/components/auth/socialLogin';
import { handleSignOut } from './action';
import SignInOrUp from '@/components/auth/SignInUp';
import AuthForm from '@/components/auth/AuthForm';

const SignInPage = () => {
  return (
    <div className="fixed top-1/2 left-1/2 bg-yelOne w-1/5 h-3/5 transform -translate-x-1/2 -translate-y-1/2">
      <SignInOrUp />
      <SocialLogin />
      <AuthForm />
    </div>
  );
};

export default SignInPage;
