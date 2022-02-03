import { mainModule } from 'process';
import React from 'react';
import TextBookHeader from './header/header';

function AppTextBook() {
  const mainWrapper = document.getElementById('app-header') as HTMLElement;
  if (mainWrapper !== null && !mainWrapper.classList.contains('hidden')) {
    mainWrapper.classList.add('hidden');
  }

  return (
    <div className='text_book'>
      <TextBookHeader></TextBookHeader>
      <p></p>
    </div>
  );
}

export default AppTextBook;
