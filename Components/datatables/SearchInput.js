/* eslint-disable prettier/prettier */
import React from 'react'
import TextField from "../../Components/TextField";
// eslint-disable-next-line react/prop-types
const Search = ({ submitFunction, setSearchtext }) => {
  return (
    <>
      <form onSubmit={submitFunction}>
          <TextField
              type="text"
              name="search"
              style="input-text"
              label="Search"
              handleChange={(value)=>setSearchtext(value)}
            ></TextField>
          <input type="submit" hidden />
      </form>
    </>
  )
}

export default React.memo(Search)
