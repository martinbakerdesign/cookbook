import { signinButtons } from './Button';
export {default as default} from './Signin.svelte'

export {default as Button} from './Button'

export {default as Window} from './Signin__Window.svelte';
export {default as Logo} from './Signin__Logo.svelte';

export const authProviders = [
    {
        provider: 'GOOGLE',
        disabled: false,
        ...signinButtons.GOOGLE
    },
    {
        provider: 'APPLE',
        disabled: true,
        ...signinButtons.APPLE
    },
    {
        provider: 'FACEBOOK',
        disabled: true,
        ...signinButtons.FACEBOOK
    },
]
