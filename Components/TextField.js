function TextField(prop) {
  return (
    <div className="relative pt-2">
      <label className="relative ">
        <input
          type={prop.type}
          name={prop.name}
          placeholder={prop.label}
          onChange={(e) => prop.handleChange(e.target.value)}
          className="w-96 h-10 px-0 text-xl pl-2  border-2 rounded-lg border-gray-300 border-opacity-70 outline-none focus:border-gray-300 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        ></input>
        <span
          className={
            "text-1xl text-black font-semibold text-opacity-100 absolute bottom-1 left-2 max-2 px-2 transition duration-200 " +
            prop.style
          }
        >
          {prop.label}
        </span>
      </label>{" "}
    </div>
  );
}
export default TextField;
