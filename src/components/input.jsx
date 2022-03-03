const Input = (props) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="email">{props.label}</label>
        <input
          onChange={props.onChange}
          value={props.value}
          name={props.name}
          id={props.id}
          className="form-control"
          type="text"
        ></input>
      </div>
    </>
  );
};

export default Input;
