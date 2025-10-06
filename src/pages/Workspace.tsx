import { useAuth } from '@/context/auth';
import { Navigate } from 'react-router-dom';

export const Workspace = () => {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) return <Navigate to='/' />;

    return <div>Workspace</div>;
};
