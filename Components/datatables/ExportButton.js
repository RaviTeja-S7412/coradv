/* eslint-disable prettier/prettier */
import React from 'react'
import { CRow, CCol, CButton } from '@coreui/react'
// eslint-disable-next-line react/prop-types
const ExportButton = ({downloadCSV}) => {
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CButton onClick={downloadCSV} size="sm" className='float-end'>Export</CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default React.memo(ExportButton)
