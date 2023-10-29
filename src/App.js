// import logo from './logo.svg';
import './App.css';
import logo from './assets/logo.png'
import "bootstrap/dist/css/bootstrap.min.css"

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCaretRight, faTimes, faComment, faSpinner } from '@fortawesome/free-solid-svg-icons';
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
    console.log("response ", response.data)
    const response_body = JSON.parse(response.data.data.attributes.body)
    console.log("response_body ", response_body)
    setRcvMsgList([...rcvMsgList, response_body.recommendation])
    setLoading(false)
  }

  // Hide chat if required
  if( showChat === false)
    return  <section style={{ position: 'fixed', bottom: "20px", right: "20px", fontSize: '40px'}} onClick={() => setShowChat(true)}>
              <FontAwesomeIcon role='button' icon={faComment} />
            </section>           


  return <section style={{ 
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
            
            {/* <p>message</p>
            <p>message</p>
            <p>message</p>
            <p>message</p> */}
            {rcvMsgList.map( (item,idx) =>
             <p key={idx}>{item}</p>)}

          </div>
          <div className='d-flex align-items-center justify-content-center input-msg-container'>
            <input className="input-msg" type="text" />
            
            <div className="d-flex align-items-center input-msg-enter"  role='button' onClick={() => sendMessage()}>
              <FontAwesomeIcon icon={faSquareCaretRight} />              
              
            </div>
            {loading?
            <div style={{ position: 'absolute', background: 'black', opacity: '0.5', width: '100%', height: '100%', borderRadius: '10px', color: 'white'}}
              className='d-flex justify-content-center align-items-center'>
              <FontAwesomeIcon icon={faSpinner} className='spinner' style={{fontSize: '30px'}} />   
            </div>
            :null}

          </div>

        </section>
}

// const App = () => {
//   return <main className='p-3'>
//             <h1>Page Title</h1>  
//             <img src='https://upload.wikimedia.org/wikipedia/en/b/b3/Tintin-mainCast.png'></img>



//             <div className='mt-3'>
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
//               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
//               with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//             </div>
//             <div className='p-3'>
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th scope="col">#</th>
//                     <th scope="col">First</th>
//                     <th scope="col">Last</th>
//                     <th scope="col">Handle</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <th scope="row">1</th>
//                     <td>Mark</td>
//                     <td>Otto</td>
//                     <td>@mdo</td>
//                   </tr>
//                   <tr>
//                     <th scope="row">2</th>
//                     <td>Jacob</td>
//                     <td>Thornton</td>
//                     <td>@fat</td>
//                   </tr>
//                   <tr>
//                     <th scope="row">3</th>
//                     <td colSpan="2">Larry the Bird</td>
//                     <td>@twitter</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//             <div className='mt-3'>
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
//               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
//               with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//             </div>
//             <div className='mt-3'>
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
//               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
//               with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//             </div>

//             <AppId />
//         </main>
// }

const App = () => <AppId />

export default App;
