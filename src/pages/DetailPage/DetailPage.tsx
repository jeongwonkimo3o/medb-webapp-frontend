import 예시사진 from '../../assets/예시사진.png';
import DrugFAQ from '../../components/DrugFAQ';

const DetailPage = (): JSX.Element => {
  return (
    <div className="p-8 md:p-12 lg:px-32 lg:py-16">
      <div className="mx-auto max-w-l text-center">
        <p className="mb-4">제조사</p>
        <h2 className="text-2xl font-medium text-blue-600 md:text-2xl">
          약 이름
        </h2>
        <img src={예시사진} alt="예시사진" className="w-84 h-52 mx-auto mt-8 mb-20" />
        <DrugFAQ />
        <DrugFAQ />
        <DrugFAQ />
        <DrugFAQ />
        <p className='text-sm mt-12 text-gray-400'>최종 업데이트 일자 2021-01-29</p>
      </div>
    </div>
  );
};

export default DetailPage;
