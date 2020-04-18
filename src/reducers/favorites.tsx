type Action = {
  type: string;
  id: string;
  title: string;
};

const favorites = (state = [], action: Action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
        },
      ];
    case 'REM_FAVORITE':
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

export default favorites;
