import React from 'react'

function Footer() {
  return (
    <div>
        <div style={{position: 'fixed', width: '100%', backgroundColor: '#212529', color: 'white', textAlign: 'center', bottom:'0', left:'0', paddingTop:'7px', marginTop: '5em'}}>
          <h5>&copy; {new Date().getFullYear()} Copyright: Mintree Ltd.</h5>
        </div>
    </div>
  )
}

export default Footer