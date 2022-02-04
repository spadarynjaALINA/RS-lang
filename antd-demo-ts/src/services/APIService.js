const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmNjNWQ1YjZiZDJmMDAxNmZhZmY5MSIsImlhdCI6MTY0Mzk1NTk1MywiZXhwIjoxNjQzOTcwMzUzfQ.IldRXDNsHwlwHueBASw9Ef5Sxw-0FqkyqwCTWglwqzs';

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

  console.log(content);
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
};

createUserWord({
  userId: '5ec993df4ca9d600178740ae',
  wordId: '5e9f5ee35eb9e72bc21af716',
  word: {
    difficulty: 'weak',
    optional: { testFieldString: 'test', testFieldBoolean: true },
  },
});

export const getWordsGroup = async () => {
  const response = await fetch(
    'https://react-learnwords-example.herokuapp.com/words?group=0&page=1',
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
