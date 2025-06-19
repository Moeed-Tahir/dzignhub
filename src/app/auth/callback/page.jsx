'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.appToken) {
      localStorage.setItem('token', session.appToken);
      router.push('/dashboard');
    }
  }, [session, status]);

  return <p>Logging you in...</p>;
}
