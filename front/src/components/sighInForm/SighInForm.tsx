'use client';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FormEventHandler } from 'react';


const SighInForm = () => {
  const router = useRouter();
  const handleSubmit:FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
    if (res && !res.error) {
      router.push('/profile');
    } else {
      console.error(res);
    }
  };
  return (
    <form onSubmit={handleSubmit} className='login-form'>
      <input
        type="email" name="email" required placeholder='email'
      />
      <input
        type="password" name="password" required placeholder='password'
      />
      <button type='submit'>Sign In</button>
    </form>
  );
};

export default SighInForm;
