const token = localStorage.getItem('token');

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
    },
  );
  const content = await rawResponse.json();
  localStorage.setItem('userId', content.id);
  // console.log(content);
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
    },
  );

  const content = await rawResponse.json();

  localStorage.setItem('token', content.token);
  localStorage.setItem('userId', content.userId);

  return content.token;
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
    },
  );

  const content = await rawResponse.json();

  let arrOfWordsId = [];
  content.forEach((element) => {
    arrOfWordsId.push(element.wordId);
  });

  return arrOfWordsId;
};

export const getLearnedWord = async (userId) => {
  try {
    const filterEasy = {
      '$or': [{ 'userWord.difficulty': 'easy' }, { 'userWord': null }],
    };
    const rawResponse = await fetch(
      `https://rs-lang-app-rss.herokuapp.com/users/${userId}/aggregatedWords?filter=${JSON.stringify(
        filterEasy,
      )}`,
      {
        method: 'GET',
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      },
    );
    const content = await rawResponse.json();
  } catch (e){return null;}
  //console.log('easy', content);
};
if (localStorage.getItem('userId') )getLearnedWord(localStorage.getItem('userId'));

export const getHardWord = async (userId, page, group) => {
  try {
    const filterHard = {
      '$and': [
        { page: { page } },
        { group: { group } },
        { wordsPerPage: 20 },
        { 'userWord.difficulty': 'hard' },
      ],
    };
    const rawResponse = await fetch(
      `https://rs-lang-app-rss.herokuapp.com/users/${userId}/aggregatedWords?filter=${JSON.stringify(
        filterHard,
      )}`,
      {
        method: 'GET',
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      },
    );
    const content = await rawResponse.json();
  } catch (e){return null;}
};
if (localStorage.getItem('userId') ) getLearnedWord(localStorage.getItem('userId')); 

export const getOneWord = async (wordId) => {
  const rawResponse = await fetch(
    `https://rs-lang-app-rss.herokuapp.com/words/${wordId}`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
      },
    },
  );
  const content = await rawResponse.json();

  //console.log(content, 'oneWord');
  return content;
};

export const deleteWord = async (userId, wordId) => {
  console.log(wordId);
  const rawResponse = await fetch(
    `https://rs-lang-app-rss.herokuapp.com/users/${userId}/words/${wordId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    },
  );

  return rawResponse;
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
    },
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

export const createUserNormalWord = async (
  userId,
  wordId,
  countOfRightAnswers,
  countOfWrongAnswers,
  difficulty,
) => {
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

      body: JSON.stringify({
        difficulty: difficulty,
        optional: {
          countRight: countOfRightAnswers,
          countWrong: countOfWrongAnswers,
        },
      }),
    },
  );
  const content = await rawResponse.json();
};

export const updateUserNormalWord = async (
  userId,
  wordId,
  countOfRightAnswers,
  countOfWrongAnswers,
  difficulty,
) => {
  const rawResponse = await fetch(
    `https://rs-lang-app-rss.herokuapp.com/users/${userId}/words/${wordId}`,
    {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        difficulty: difficulty,
        optional: {
          countRight: countOfRightAnswers,
          countWrong: countOfWrongAnswers,
        },
      }),
    },
  );
  const content = await rawResponse.json();
};

export const getUserNormalWord = async (userId, wordId) => {
  const rawResponse = await fetch(
    `https://rs-lang-app-rss.herokuapp.com/users/${userId}/words/${wordId}/`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    },
  );

  const content =  await rawResponse.json();

  return content;
};

export const getUserWords = async (userId) => {
  const rawResponse = await fetch(
    `https://rs-lang-app-rss.herokuapp.com/users/${userId}/words/`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    },
  );
  const content = await rawResponse.json();
  let arrOfWordsId = [];
  content.forEach((element) => {
    arrOfWordsId.push(element.wordId);
  });

  return arrOfWordsId;
};

export const getFullUserWords = async (userId) => {
  const rawResponse = await fetch(
    `https://rs-lang-app-rss.herokuapp.com/users/${userId}/words/`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    },
  );
  const content = await rawResponse.json();
  let arrOfWordsId = [];
  content.forEach((element) => {
    if (element.difficulty === 'easy') {
      arrOfWordsId.push(element.wordId);
    }
  });

  return arrOfWordsId;
};



export const updateStatistics = async (
  userId,
  statArr,
) => {
  console.log(statArr);
  const rawResponse = await fetch(
    `https://rs-lang-app-rss.herokuapp.com/users/${userId}/statistics`,
    {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        learnedWords: 0,
        optional: {
          longStat: {
            stat: statArr,
          },
        },
      }),
    },
  );
  const content = await rawResponse.json();
  console.log(content);
};

export const getStatistics = async (userId) => {
  const rawResponse = await fetch(
    `https://rs-lang-app-rss.herokuapp.com/users/${userId}/statistics/`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    },
  );
  let dailyStat = [];
  await rawResponse.json().then(content => {
    content.optional.longStat.stat.forEach((element) => {
      dailyStat.push(element);
      console.log(element);
    });
  });
  
  

  return dailyStat;
  
  
  
  // return content;
};
const date = new Date();
const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
const dataR = `${date.getDate()}.${month}`;
  
getStatistics(localStorage.getItem('userId')).catch(() => updateStatistics(localStorage.getItem('userId'), [{
  date: dataR, sprintRight: 0, sprintWrong: 0, sprintMax: 0, audioCallRight: 0, 
  audioCallWrong:0,
  audioCallMax: 0,
  newWords: 0 }]));
