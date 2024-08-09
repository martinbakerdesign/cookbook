const menuFilters = {
    author: {
      label: 'Created By',
      key: 'filter--author',
      items: [{value: 'anyone', label: 'Anyone'}, {value: 'self', label: 'Me'}, {value: 'others', label: 'Others'}]
    },
    sortKey: {
      label: 'Sort By',
      key: 'sort--key',
      items: [{value: 'title', label: 'Title'}, {value: 'date-created', label: 'Created'}, {value: 'date-edited', label: 'Last Edited'}]
    },
    sortOrder: {
      label: 'Sort Order',
      key: 'sort--dir',
      items: [{value: 'ASC', label: 'A-Z'}, {value: 'DESC', label: 'Z-A'}]
    },
  }

  export {
    menuFilters as default
  }