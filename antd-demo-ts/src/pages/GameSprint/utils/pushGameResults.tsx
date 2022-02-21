import {
  createUserNormalWord,
  getUserNormalWord,
  getUserWords,
  updateUserNormalWord,
} from '../../../services/APIService';
import { Word } from '../components/main/GameField';

export function pushGameResults(correctAnswers: Word[], wrongAnswers: Word[]) {
  getUserWords(localStorage.getItem('userId'))
    .then((userWords) => {
      // console.log(userWords);
      correctAnswers.forEach(word => {
        if (!userWords.includes(word.id)) {
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
    }).catch(err => console.log('Пользователь не выполнил вход'));
}