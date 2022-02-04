import TextBookLevelsCard from './level-card';
function TextBookLevels() {
  return (
    <div className='text_book__levels'>
      <TextBookLevelsCard level='A1' description='Easy'></TextBookLevelsCard>
      <TextBookLevelsCard level='A2' description='Easy'></TextBookLevelsCard>
      <TextBookLevelsCard level='B1' description='Medium'></TextBookLevelsCard>
      <TextBookLevelsCard level='B2' description='Medium'></TextBookLevelsCard>
      <TextBookLevelsCard level='C1' description='Hard'></TextBookLevelsCard>
      <TextBookLevelsCard level='C2' description='Hard'></TextBookLevelsCard>
    </div>
  );
}

export default TextBookLevels;
