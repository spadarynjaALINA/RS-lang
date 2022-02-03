import { Pagination } from 'antd';

function TextBookPagination() {
  return (
    <div className='text_book__pagination'>
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
}

export default TextBookPagination;
