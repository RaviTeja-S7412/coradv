import { useEffect, useState } from "react";

function Input(prop) {

  const[ inputstyle, setInputstyle] = useState('border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600')
  const[ error, setError ] = useState(true);
  // const[ labelstyle, setLabelstyle] = useState('text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500')

  useEffect(() => {

    if(prop.errorMessage && error){
      setInputstyle('border-red-300 dark:border-red-600 dark:focus:border-red-500 focus:border-red-600');
      // setLabelstyle('text-red-500 dark:text-red-400 peer-focus:text-red-600 peer-focus:dark:text-red-500');
    }else{
      setInputstyle('border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600');
      // setLabelstyle('text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500');
    }

  },[prop.errorMessage, error])

  const onchangeinput = (e) => {
    prop.handleChange(e.target.value)
    if(e.target.value == ""){
      setError(true);
    }else{
      setError(false);
    }
  }
  return (
    <>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type={prop.type}
          name={prop.name}
          id={prop.name}
          className={"block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none dark:text-white focus:outline-none focus:ring-0 peer text-gray-900" + inputstyle}
          placeholder=" "
          // required={prop.required}
          onChange={(e) => onchangeinput(e)}
        />
        <label
          for={prop.name}
          className="peer-focus:font-medium absolute text-md duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6   text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
        >
          {prop.label}
        </label>
        <p id="helper-text-explanation" class="mt-2 text-xs text-red-500 dark:text-red-400">{ error ? prop.errorMessage : ""}</p>

      </div>
    </>
  );
}
export default Input;
