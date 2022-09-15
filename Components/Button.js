import { useEffect, useState } from "react";

function Button(prop) {
  const buttoncolor = prop.bcolor;
  return (
    
    <>
      <button
          type={prop.type}
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className={'inline-block px-6 py-2.5 bg-'+`${buttoncolor}`+'-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-'+`${buttoncolor}`+'-700 hover:shadow-lg focus:bg-'+`${buttoncolor}`+'-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-'+`${buttoncolor}`+'-800 active:shadow-lg transition duration-150 ease-in-out'}
          data-bs-toggle={prop.modalopen ? 'modal' : ''}
          data-bs-dismiss={prop.modalclose ? 'modal' : ''}
          data-bs-target={"#"+prop.modalopen ? prop.target : ''}
          // onClick={handleCreate}
        >
          {prop.title}
      </button>
    </>
  );
}
export default Button;
