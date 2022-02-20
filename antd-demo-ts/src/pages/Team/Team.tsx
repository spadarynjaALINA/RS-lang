import './Team.css';
export function Team() {
  return (
   <div className='about-wrap'>
    <h2 className='about-title'></h2>
      <div className='about-item'>
        <img src="./../../assets/vika-png.png" alt="Photo Vika" />
        <p className='about-description'>Тут текст Вики</p>
    </div>
    <div className='about-item'>
        <img src="" alt="Photo Anton" />
        <p className='about-description'>Тут текст Антона</p>
    </div>
    <div className='about-item'>
        <img src="" alt="Photo Alina" />
        <p className='about-description'>Тут текст Алины</p>
      </div>
    </div>
  );
}