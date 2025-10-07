import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import type { FC } from 'react';
import type { TConditionalRender } from './plugins';

interface IConditionalRender {
    children: React.ReactNode;
    conditionalRenders?: { conditions: TConditionalRender[]; redirectTo?: string; fallbackElement?: React.ReactNode }[];
}

/**
 * ConditionalRender checks the first matching condition in the list:
 * 1. Checks the first match in conditionalRenders.
 * 2. If `redirectTo` is specified, redirects to that route.
 * 3. If no `redirectTo`, renders the `fallbackElement` if provided.
 * 4. If no match is found, renders the `children` prop.
 *
 * Example usage:
 * <ConditionalRender conditionalRenders={[{ conditions: [isNotLoggedIn], redirectTo: '/login' }]}>
 *   <div>Content</div>
 * </ConditionalRender>
 *
 * @param {IConditionalRender} props
 * @return {React.ReactNode}
 */
export const ConditionalRender: FC<IConditionalRender> = (props) => {
    const { children, conditionalRenders = [] } = props;
    const location = useLocation();
    const auth = useAuth();

    // Redirect at the first match
    const firstRedirect = conditionalRenders.find(({ conditions }) => conditions.every((condition) => condition(auth)));
    if (firstRedirect)
        return firstRedirect.redirectTo ? (
            <Navigate to={firstRedirect.redirectTo} state={{ from: location }} replace />
        ) : (
            firstRedirect.fallbackElement
        );

    return children;
};
