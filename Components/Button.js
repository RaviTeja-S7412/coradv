import { useEffect, useState } from "react";

function Button(prop) {

  return (
    <>
      <button
          type={prop.type}
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className={'inline-block px-6 py-2.5 bg-'+`${prop.color}`+'-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-'+`${prop.color}`+'-700 hover:shadow-lg focus:bg-'+`${prop.color}`+'-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-'+`${prop.color}`+'-800 active:shadow-lg transition duration-150 ease-in-out'}
          data-bs-toggle={prop.modal ? 'modal' : ''}
          data-bs-dismiss={prop.modal ? 'modal' : ''}
          data-bs-target={"#"+prop.target}
          // onClick={handleCreate}
        >
          {prop.title}
      </button>
    </>
  );
}
export default Button;
