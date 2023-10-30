// import logo from './logo.svg';
import './App.css';
import logo from './assets/logo.png'
import logomin from './assets/logomin.png'
import spinner from './assets/spinner.svg';
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState } from 'react';


const AppId = () => {
  const [showChat, setShowChat ] = useState(false)
  const [loading, setLoading ] = useState(false)
  const [rcvMsgList, setRcvMsgList ] = useState([])
  const sendMessage = async () => {
    setLoading(true)
    const body = {
      data: {
        type: "recommendation",
        attributes: {
          product_type: "Can you recommend me a good pair of racing shoes",
          meta_info: ""
        }
      }
    }
    const response = await axios.post('https://testapis-f02f03987a59.herokuapp.com/api/recommendation', body)    
    const response_body = JSON.parse(response.data.data.attributes.body)
    setRcvMsgList([...rcvMsgList, response_body.recommendation])
    setLoading(false)
  }


  return <>
            <section role="button" className={showChat?'d-none':''} style={{ position: 'fixed', bottom: "20px", right: "20px", fontSize: '40px'}} onClick={() => setShowChat(true)}>
              <img src={logomin} alt=""></img>
            </section>  

            <section className={showChat?'show-chat':'d-none'} style={{ 
              position: 'fixed', bottom: "20px", right: "20px", 
              background: 'white', height: "600px", width: '400px', border: '1px solid #999', borderRadius: '10px',
              padding: '1em', display: 'flex', flexDirection: 'column'
              }}>

              <div className='d-flex align-items-center'>
                <div className='flex-grow-1 text-center'>
                  <img src={logo} height={40} width={130} alt=''></img>
                </div>
                <FontAwesomeIcon role='button' icon={faTimes}  onClick={() => setShowChat(false)}/>
              </div>
              <div className='flex-grow-1 mt-3 mb-3 rcv-msg-container' style={{ overflowY: 'auto'}}>
                
                {rcvMsgList.map( (item,idx) =>
                <p key={idx}>{item}</p>)}

              </div>
              {loading?
              <div className="d-flex justify-content-end align-items-end">
                <img src={spinner} alt="" style={{ height: '60px'}}></img>
              </div>
              :null}
              <div className='d-flex align-items-center justify-content-center input-msg-container'>
                <input className="input-msg" type="text" />
                
                <div className="d-flex align-items-center input-msg-enter"  role='button' onClick={() => sendMessage()}>
                  <FontAwesomeIcon icon={faSquareCaretRight} />              
                </div>

              </div>

            </section>

        </>
}


const App = () => <AppId />

export default App;
