/* eslint-disable max-len */
import { LogoIcon } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth';
import { Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'sonner';

export function ForgotPasswordPage() {
    const { currentUser, isLoggedIn, sendEmailToResetPassword } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleResetPassword = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                await sendEmailToResetPassword({ email });
                toast.success('Email sent! Please check your email to reset your password');
            } catch (err: any) {
                console.error(err);
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        },
        [email, sendEmailToResetPassword]
    );

    if (isLoggedIn) return <Navigate to='/app' />;
    if (currentUser && !currentUser.emailVerified) return <Navigate to='/login' />;

    return (
        <section className='flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent'>
            <form
                action=''
                className='bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]'
            >
                <div className='p-8 pb-6'>
                    <div>
                        <Link to='/' aria-label='go home'>
                            <LogoIcon />
                        </Link>
                        <h1 className='mb-1 mt-4 text-xl font-semibold'>Forgot your password?</h1>
                        <p className='text-sm'>Enter your email to get a link to reset your password</p>
                    </div>

                    <hr className='my-4 border-dashed' />

                    <div className='space-y-5'>
                        <div className='space-y-2'>
                            <Label htmlFor='email' className='block text-sm'>
                                Username
                            </Label>
                            <Input
                                type='email'
                                required
                                name='email'
                                id='email'
                                placeholder='example@email.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <Button className='w-full' onClick={handleResetPassword}>
                            {loading ? <Loader2 className='size-4 animate-spin' /> : 'Continue'}
                        </Button>
                    </div>
                </div>

                <div className='bg-muted rounded-(--radius) border p-3'>
                    <p className='text-accent-foreground text-center text-sm'>
                        Have an account ?
                        <Button asChild variant='link' className='px-2'>
                            <Link to='/login'>Sign In</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    );
}
