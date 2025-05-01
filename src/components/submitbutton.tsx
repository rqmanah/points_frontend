import { Link } from "react-router-dom";

function GreenButton({ type, title }: any) {
  return (
    <div className="w-100">
      <Link to={"/schools"}>
        <button
          type={type}
          className="custom-card-button fw-700 font-size-24 btn-green"
        >
          {title}
        </button>
      </Link>
    </div>
  );
}

export default GreenButton;
