function CustomInput({ label, type }: any) {
  return (
    <div className="mb-3 w-100">
      <label
        htmlFor="username"
        className=" text-end d-block fw-700 font-size-16 mb-2"
      >
        {label}
      </label>
      <input
        id="password"
        type={type}
        className="custom-card-input text-end p-2"
        placeholder={label}
      />
    </div>
  );
}

export default CustomInput;
