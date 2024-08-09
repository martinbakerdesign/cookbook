export {default as default} from './Signin__Button.svelte'

import icons from './icons'

export const signinButtons = {
    APPLE: {
        bg: '#111111',
        text: 'white',
        name: 'Apple',
        icon: icons.apple
    },
    FACEBOOK: {
        bg: '#1877f2',
        text: '#fff',
        name: 'Facebook',
        icon: icons.facebook
    },
    GOOGLE: {
        bg: '#fff',
        text: '#5c585b',
        border: '#bfbbb6',
        name: 'Google',
        icon: icons.google
    },
}