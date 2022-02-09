

const token = localStorage.getItem('token')
console.log(token)
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmNjNWQ1YjZiZDJmMDAxNmZhZmY5MSIsImlhdCI6MTY0NDEzNzY1NiwiZXhwIjoxNjQ0MTUyMDU2fQ.ASgzh_27j-JCSZI8aDr2fSRbA9hrqE7VPjlkc1OM_xA';

export const createUser = async (user) => {
  const rawResponse = await fetch(
    'https://rs-lang-app-rss.herokuapp.com/users',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }
  );
  const content = await rawResponse.json();
localStorage.setItem('userId', content.id)
  console.log(content);
};

export const loginUser = async (user) => {
  const rawResponse = await fetch(
    'https://rs-lang-app-rss.herokuapp.com/signin',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }
  );
 
  const content = await rawResponse.json();
localStorage.setItem('token', content.token)
  console.log(content, content.token, 'log in');
};

export const createUserWord = async ({ userId, wordId, word }) => {
  const rawResponse = await fetch(
    `https://rs-lang-app-rss.herokuapp.com/users/${userId}/words/${wordId}`,
    {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    }
  );
  const content = await rawResponse.json();

  console.log(content);
}

createUserWord({
  userId: localStorage.getItem('userId'),
  wordId: localStorage.getItem('userId'),
  word: {
    difficulty: 'weak',
    optional: { testFieldString: 'test', testFieldBoolean: true },
  },
});

export const getWordsGroup = async (group, page) => {
  const response = await fetch(
    `https://react-learnwords-example.herokuapp.com/words?group=${group}&page=${
      page - 1
    }`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    }
  );
  const content = await response.json();

  return content;
};
// export const getNewToken = async (userId) => {
//   const response = await fetch(
//     `https://rs-lang-app-rss.herokuapp.com/users/${userId}/tokens}`,
//     {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(),
//     }
//   );
//   const content = await response.json();
//   console.log(content);
//   return content;

// };