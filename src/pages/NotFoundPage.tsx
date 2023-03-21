import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">잘못된 접근입니다.</h1>
          <p className="py-6">웹 주소를 확인하시거나, 다시 시도해주세요.</p>
          <Link to="/">
            <button className="btn btn-primary">홈으로</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
