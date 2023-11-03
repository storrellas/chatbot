// import logo from './logo.svg';
import './App.css';
import logo from './assets/logo.png'
import logomin from './assets/logomin.png'
import spinner from './assets/spinner.svg';
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React, { useState } from 'react';

const AUTHOR = { ME: 'ME', BOT: 'BOT' } 
const AppId = () => {
  const [showHideChat, setShowHideChat ] = useState(false)
  const [showChat, setShowChat ] = useState(false)
  const [loading, setLoading ] = useState(false)
  const [messageList, setMessageList ] = useState([])
  const [ message, setMessage ] = useState('')

  const sendMessage = async (message) => {
    const messageListLocal = [...messageList]
    messageListLocal.push({author: AUTHOR.ME, name: 'Me', message })
    setMessageList([...messageListLocal ])

    // Do not launch multiple calls
    if( loading ) return
    setLoading(true)
    const conversation_history = messageListLocal.map( item => item.message)
    conversation_history.pop()
    const body = {
      data: {
        type: "recommendation",
        attributes: {
          product_type: message,
          conversation_history
        }
      }
    }
    const base_url = window.base_url?window.base_url:"https://apid.duckdns.org"

    const response = await axios.post(`${base_url}/api/chat`, body)    
    const json_response = response.data.data.attributes
    messageListLocal.push({author: AUTHOR.BOT, message: json_response.body, name: json_response.name})
    
    // messageListLocal.push({author: AUTHOR.BOT, message: "ISay"})
    // console.log("messageListLocalAfter ", messageList)

    setMessageList(messageListLocal)
    setLoading(false)
  }


  const onHideChat = () => {
    setShowHideChat(true)
    setShowChat(false)
    setTimeout( () => {
      setShowHideChat(false)
    }, 200)
  }

  const onKeyDownMessage = (e) => {
    if( e.key === 'Enter'){
      setMessage('')            
      sendMessage(message)
    }
  }

  const onClickSendMessage = () => {
    setMessage('')        
    sendMessage(message)
  }

  const getClass = () => {

    if( showChat === true )
      return 'show-chat d-flex flex-column chat-container'

    if( showChat === false ){
      if (showHideChat === true){
        return 'hide-chat d-flex flex-column chat-container'
      }else{
        return 'd-none'
      }
    }
  }


  return <>
            <section role="button" className={showChat?'d-none':'chat-icon'}
              onClick={() => setShowChat(true)}>
              <img src={logomin} alt=""></img>
            </section>  

            <section className={getClass()} style={{ maxWidth: "90%", maxHeight: "90%"}}>

              <div className='d-flex align-items-center'>
                <div className='flex-grow-1 text-center'>
                  <img src={logo} height={40} width={130} alt=''></img>
                </div>
                <FontAwesomeIcon role='button' icon={faTimes}  onClick={() => onHideChat()}/>
              </div>
              <div className='flex-grow-1 mt-3 mb-3 rcv-msg-container' style={{ overflowY: 'auto'}}>
                
                {messageList.map( (item,idx) =>
                <div key={idx} className='mt-3 pe-2'>
                  <div className={`w-100 ${item.author === AUTHOR.BOT?'text-end':'text-start'}`}>
                    <b>{item.name} says:</b>
                  </div>
                  <div style={{ textAlign:'justify' }} key={idx}>{item.message}</div>
                </div>)}

              </div>
              {loading?
              <div className="d-flex justify-content-end align-items-end">
                <img src={spinner} alt="" style={{ height: '60px'}}></img>
              </div>
              :null}
              <div className='d-flex align-items-center justify-content-center input-msg-container'>
                <input value={message}
                  className="input-msg" type="text" 
                  onChange={(e) => setMessage(e.target.value)} 
                  onKeyDown={(e) => onKeyDownMessage(e)}/>
                
                <div className="d-flex align-items-center input-msg-enter"  role='button' onClick={() => onClickSendMessage()}>
                  <FontAwesomeIcon icon={faSquareCaretRight} />              
                </div>

              </div>

            </section>

        </>
}


const App = () => <AppId />

export default App;
