import { Pagination } from 'antd';

function TextBookPagination(props: any) {
  return (
    <div className='text_book__pagination'>
      <Pagination defaultCurrent={1} total={300} onChange={props.onClick} />
    </div>
  );
}

export default TextBookPagination;
