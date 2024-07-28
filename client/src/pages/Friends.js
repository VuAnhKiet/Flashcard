import React from 'react'
                    //Still in progress
function Friends() {
  return (
    <div id="fb">
        <div id="fb-top">
          <p><b>Friend Requests</b><span>Find Friends • Settings</span></p>
        </div>
        <img src="../../public/logo192.png" alt="" height={100} width={100} />
        <p id="info"><b>Natalie G.</b> <br /> <span>14 mutual friends</span></p>
        <div id="button-block">
          <div id="confirm">Confirm</div>
          <div id="delete">Delete Request</div>
        </div>
      </div>
  )
}

export default Friends