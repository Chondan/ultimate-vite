import { Outlet } from 'react-router-dom';

export const AppPage = () => {
    return (
        <div>
            <div>App Page</div>
            <Outlet />
        </div>
    );
};
