import { getWordsGroup } from '../services/APIService';
export const getWords = async (group: number, page: number) => {
  const data = await getWordsGroup(group, page);

  return data;
};
