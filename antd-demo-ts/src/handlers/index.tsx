import { getWordsGroup } from '../services/APIService';
export const getWords = async () => {
  const data = await getWordsGroup();

  return data;
};
