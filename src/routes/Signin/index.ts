import { signinButtons } from './Button';
export {default as default} from './Signin.svelte'

export {default as Button} from './Button'

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
