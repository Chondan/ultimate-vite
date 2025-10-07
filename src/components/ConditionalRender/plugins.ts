import type { IAuthContext } from '@/context/auth';

export type TConditionalRender = (auth: IAuthContext) => boolean;
export const ConditionalRenderPlugins: {
    isNotLoggedIn: TConditionalRender;
    isEmailNotVerified: TConditionalRender;
    isLoggedIn: TConditionalRender;
} = {
    isNotLoggedIn: (auth: IAuthContext) => !auth.isLoggedIn,
    isEmailNotVerified: (auth: IAuthContext) => Boolean(auth.currentUser && !auth.currentUser.emailVerified),
    isLoggedIn: (auth: IAuthContext) => auth.isLoggedIn,
};
