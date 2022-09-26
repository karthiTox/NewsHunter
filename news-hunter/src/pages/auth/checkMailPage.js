import { useSelector } from "react-redux";

function CheckMailPage({ authRepository }) {
  const authReducer = useSelector((state) => state.authReducer);

  return (
    <div>
      <p className="fs-3 fw-bold text-center text-white">
        Email send to {authReducer.email}
      </p>
      <p className="fs-5 text-center text-white">please check your mail!</p>;
    </div>
  );
}

export default CheckMailPage;
