import { useAuth } from '@/context/auth';
import { Navigate } from 'react-router-dom';

export const Workspace = () => {
    const { currentUser } = useAuth();
    if (!currentUser) return <Navigate to='/' />;

    return <div>Workspace</div>;
};
