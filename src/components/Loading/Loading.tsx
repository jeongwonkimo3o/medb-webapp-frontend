import LoadingGif from '../../assets/loading.gif';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-white bg-opacity-50">
      <img src={LoadingGif} alt="로딩 중..." className="w-20 h-20" />
    </div>
  );
}

export default Loading;