import { Link } from "react-router-dom";

function CustomButton({ type, title }: any) {
  return (
    <div className="w-100">
      <Link to={"/packages"}>
        <button
          type={type}
          className={`custom-card-button fw-700 font-size-24 btn-blue`}
        >
          {title}
        </button>
      </Link>
    </div>
  );
}

export default CustomButton;
