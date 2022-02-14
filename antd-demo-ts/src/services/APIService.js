const token = localStorage.getItem('token');
console.log(token);
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
  localStorage.setItem('userId', content.id);
  console.log(content);
};
export function updateToken(data) {
  console.log(data);
  return data;
}

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

  localStorage.setItem('token', content.token);

  console.log(content, content.token, 'log in');

  return content.token;
};

let wordValue = {
  difficulty: 'weak',
  optional: { testFieldString: 'test', testFieldBoolean: true },
};
export const createUserWord = async (userId, wordId, word = wordValue) => {
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

  console.log(content.wordId, content.id);
};

export const getUserWord = async (userId) => {
  const rawResponse = await fetch(
    `https://rs-lang-app-rss.herokuapp.com/users/${userId}/words/`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    }
  );
  const content = await rawResponse.json();
  let arrOfWordsId = [];
  content.forEach((element) => {
    arrOfWordsId.push(element.wordId);
  });

  return arrOfWordsId;
};

export const getOneWord = async (wordId) => {
  const rawResponse = await fetch(
    `https://rs-lang-app-rss.herokuapp.com/words/${wordId}`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
      },
    }
  );
  const content = await rawResponse.json();

  console.log(content);
  return content;
};

/*getUserWord({
  userId: localStorage.getItem('userId'),
  wordId: '5e9f5ee35eb9e72bc21af4a0',
});*/

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
