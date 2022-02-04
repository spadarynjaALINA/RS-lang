const Type = {
  INTEGER: 'INTEGER',
  FLOAT: 'FLOAT',
  BOOL: 'BOOL',
  STRING: 'STRING',
};

function createStorage(key, type) {
  return {
    Set: (value) => {
      localStorage.setItem(key, value);
    },
    Get: () => {
      const value = localStorage.getItem(key);

      switch (type) {
        case Type.INTEGER:
          return parseInt(value);

        case Type.FLOAT:
          return parseFloat(value);

        case Type.BOOL:
          return value === 'true';

        default:
          return value;
      }
    },
    Remove: () => {
      localStorage.removeItem(key);
    },
  };
}

export const storage = {
  accessToken: createStorage('access-token', Type.STRING),
};
