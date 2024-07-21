import { getControls } from '..'

export {default as default} from './Settings__Blocks.svelte'

export {default as Block} from './Settings__Block.svelte'

export {default as Group} from './Settings__Blocks__Group.svelte'

export function getBlockConfig (config, key, index) {
    return {
          ...config,
          ...(config.isGroup === true && { controls: getControls(config) }),
          key,
          index
      }
  }