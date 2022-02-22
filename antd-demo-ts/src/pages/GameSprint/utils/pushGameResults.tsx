import {
  createUserNormalWord,
  getUserNormalWord,
  getUserWords,
  updateUserNormalWord,
  getStatistics,
  updateStatistics,
} from '../../../services/APIService';
import { Word } from '../components/main/GameField';

interface Stat {
  date: string;
  sprintRight: number;
  sprintWrong: number;
  sprintMax: number;
  audioCallRight: number;
  audioCallWrong: number;
  audioCallMax: number;
  newWords: number;
}

export function pushGameResults(correctAnswers: Word[], wrongAnswers: Word[], gameName: string, maxCount: number) {
  const date = new Date();
  const month = date.getMonth() < 10 ? +`0${date.getMonth() + 1}` : date.getMonth() + 1;
  const dataR = `${date.getDate()}.${month}`;
  let newWords = 0;

  getUserWords(localStorage.getItem('userId'))
    .then((userWords) => {

      correctAnswers.forEach(word => {
        if (!userWords.includes(word.id)) {
          newWords += 1;
          createUserNormalWord(localStorage.getItem('userId'), word.id, 1, 0, 'normal');
        } else {
          getUserNormalWord(localStorage.getItem('userId'), word.id)
            .then((userWord) => {
              if ((userWord.optional.countRight >= 2 && userWord.difficulty === 'normal') || (userWord.optional.countRight >= 4 && userWord.difficulty === 'hard')) {
                updateUserNormalWord(localStorage.getItem('userId'), word.id, userWord.optional.countRight + 1, userWord.optional.countWrong, 'easy');
                // console.log('правильное слово существует, изученное',
                //   userWord.optional.countRight + 1,
                //   userWord.optional.countWrong,
                //   word.word);
              } else {
                updateUserNormalWord(localStorage.getItem('userId'), word.id, userWord.optional.countRight + 1, userWord.optional.countWrong, userWord.difficulty);
                // console.log('правильное слово существует',
                //   userWord.optional.countRight + 1,
                //   userWord.optional.countWrong,
                //   word.word,
                //   userWord.difficulty);
              }
            });
        }
      });
      wrongAnswers.forEach(word => {
        if (!userWords.includes(word.id)) {
          newWords += 1;
          createUserNormalWord(localStorage.getItem('userId'), word.id, 0, 1);
        } else {
          getUserNormalWord(localStorage.getItem('userId'), word.id)
            .then((userWord) => {
              if (userWord.difficulty === 'easy') {
                updateUserNormalWord(localStorage.getItem('userId'), word.id, 0, userWord.optional.countWrong + 1, 'normal');
                // console.log('слово убрали из изученных', word.word);
              }
              updateUserNormalWord(localStorage.getItem('userId'), word.id, 0, userWord.optional.countWrong + 1, 'normal');
              // console.log('неправильное слово существует',
              //   userWord.optional.countRight,
              //   userWord.optional.countWrong + 1,
              //   word.word);
            });
        }
      });

    }).then(() => {
      if (gameName === 'sprint') {
        getStatistics(localStorage.getItem('userId')).then((statArray: Stat[]) => {
          console.log(statArray);
          if (statArray[statArray.length - 1]?.date === dataR) {
            // console.log('дата совпала');
            const statArr = [...statArray.slice(0, statArray.length - 1), {
              date: dataR,
              sprintRight: statArray[statArray.length - 1].sprintRight + correctAnswers.length,
              sprintWrong: statArray[statArray.length - 1].sprintWrong + wrongAnswers.length,
              sprintMax: statArray[statArray.length - 1].sprintMax + maxCount,
              audioCallRight: statArray[statArray.length - 1].audioCallRight,
              audioCallWrong: statArray[statArray.length - 1].audioCallWrong,
              audioCallMax: statArray[statArray.length - 1].audioCallMax,
              newWords: statArray[statArray.length - 1].newWords + newWords,
            }];
            updateStatistics(localStorage.getItem('userId'),
              statArr,
            );
            //   .then(() => {
            //   getStatistics(localStorage.getItem('userId')).then((statArray3: Stat[]) => {
            //     console.log(statArray3);
            //   });
            // });
          } else {
            // console.log('дата  НЕ совпала', dataR, statArray[statArray.length - 1]?.date);
            const statArr = [...statArray.slice(0, statArray.length), {
              date: dataR,
              sprintRight: correctAnswers.length,
              sprintWrong: wrongAnswers.length,
              sprintMax: maxCount,
              audioCallRight: 0,
              audioCallWrong: 0,
              audioCallMax: 0,
              newWords: newWords,
            }];
            updateStatistics(localStorage.getItem('userId'),
              statArr,
            );
            // .then(() => {
            //   getStatistics(localStorage.getItem('userId')).then((statArray3: Stat[]) => {
            //     console.log(statArray3);
            //   });
            // });
          }
        });
        // console.log(newWords, 'новые слова');
      } else if (gameName === 'audioCall') {
        getStatistics(localStorage.getItem('userId')).then((statArray: Stat[]) => {
          if (statArray[statArray.length - 1]?.date === dataR) {
            const statArr = [...statArray.slice(0, statArray.length - 1), {
              date: dataR,
              sprintRight: statArray[statArray.length - 1].sprintRight,
              sprintWrong: statArray[statArray.length - 1].sprintWrong,
              sprintMax: statArray[statArray.length - 1].sprintMax,
              audioCallRight: statArray[statArray.length - 1].audioCallRight + correctAnswers.length,
              audioCallWrong: statArray[statArray.length - 1].audioCallWrong + wrongAnswers.length,
              audioCallMax: statArray[statArray.length - 1].audioCallMax + maxCount,
              newWords: statArray[statArray.length - 1].newWords + newWords,
            }];
            updateStatistics(localStorage.getItem('userId'),
              statArr,
            );
          } else {
            const statArr = [...statArray.slice(0, statArray.length), {
              date: dataR,
              sprintRight: 0,
              sprintWrong: 0,
              sprintMax: 0,
              audioCallRight: correctAnswers.length,
              audioCallWrong: wrongAnswers.length,
              audioCallMax: maxCount,
              newWords: newWords,
            }];
            updateStatistics(localStorage.getItem('userId'),
              statArr,
            );
          }
        });
      }
    })
    .catch(err => console.log('Пользователь не выполнил вход'));
}