const tailwindConfig = {
    colors: {
      transparent: "transparent",
      current: "currentColor",
    },
    padding: {
      'safe-area-inset-top': 'env(safe-area-inset-top)',
      'safe-area-inset-bottom': 'env(safe-area-inset-bottom)',
      'safe-area-inset-left': 'env(safe-area-inset-left)',
      'safe-area-inset-right': 'env(safe-area-inset-right)'
    },
    aspectRatio: {
      logo: '39 / 23',
      square: '1 / 1',
      unset: 'unset'
    },
    borderWidth: {
      'none': 'none',
      '0': '0',
    }
  };

  export default tailwindConfig;