import './Team.css';
export function Team() {
  return (
    <div className='team-wrap'>
      <h2 className='about-title'>Команда 1</h2>
      <div className='team-item'>
        <div className='vika-pic team-pic'></div>
        <p className='about-description'>
          Учебник, частично карточки слов, прогресс изучения, изученные слова,
          участие в дизайне 🤓
          <span className='discord-link'>
            Viktoria Alexandrovich(vikklex)#0576
          </span>
        </p>
      </div>
      <div className='team-item'>
        <div className='anton-pic team-pic'></div>
        <p className='about-description'>
          Игра Спринт, частично карточки слов и логика изученных слов, результаты мини-игр, запросы на сервер.
          <span className='discord-link'>Anton Tananka(alivar391)#9131</span>
        </p>
      </div>
      <div className='team-item'>
        <div className='alina-pic team-pic'></div>
        <p className='about-description'>
          Страницы: домашняя,о команде, о приложении. Авторизация. Игра
          аудиовызов. Участие в дизайне проекта. <br></br>
          <span className='discord-link'>
            Alina Husarava(spadarynjaalina)#9241
          </span>
        </p>
      </div>
    </div>
  );
}
