import { useAuth } from '@/context/auth';
import { Navigate } from 'react-router-dom';

export const AppPage = () => {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) return <Navigate to='/' />;

    return <div>AppPage</div>;
};
