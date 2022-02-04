import logo from '../../../../img/logo.png';
import TextBookHeaderSvg from './headerSVG';

function TextBookHeader() {
  return (
    <div className='text_book__header_wrapper'>
      <div className='text_book__header'>
        <TextBookHeaderSvg></TextBookHeaderSvg>
        <div className='icon-text'>
          <img className='menu-burger' src={logo} alt='logo'></img>
          <div>SpaceEng.</div>
        </div>
        <div className='text_book__header_icons'>
          <i className='fas fa-user-check'></i>
          <i className='fas fa-sign-out-alt'></i>
        </div>
      </div>
    </div>
  );
}

export default TextBookHeader;
