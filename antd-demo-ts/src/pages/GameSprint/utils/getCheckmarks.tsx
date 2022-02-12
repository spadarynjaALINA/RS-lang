export function getCheckmarks(a: number) {
  switch (a) {
    case 0:
      return <p>
        <span className='game-checkmark-grey'>✓</span>
        <span className='game-checkmark-grey'>✓</span>
        <span className='game-checkmark-grey'>✓</span>
      </p>
    case 1:
      return <p className='game-checkmark'>
      <span className='game-checkmark'>✓</span>
      <span className='game-checkmark-grey'>✓</span>
      <span className='game-checkmark-grey'>✓</span>
      </p>
    case 2:
      return <p className='game-checkmark'>
      <span className='game-checkmark'>✓</span>
      <span className='game-checkmark'>✓</span>
      <span className='game-checkmark-grey'>✓</span>
      </p>
    case 3:
      return <p className='game-checkmark'>
      <span className='game-checkmark'>✓</span>
      <span className='game-checkmark'>✓</span>
      <span className='game-checkmark'>✓</span>
    </p>
  }
}