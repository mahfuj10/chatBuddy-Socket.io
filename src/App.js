import './App.css';
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './Chat';


const socket = io.connect("http://localhost:5000")

function App() {

  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showSocket, setShowSocket] = useState(false);

  const joinRoom = () => {

    if (userName !== '' && room !== "") {
      socket.emit('join_room', room);
      setShowSocket(true)
      localStorage.setItem('room', room);
      localStorage.setItem('name', userName);
    }

  };

  const storeRoomId = localStorage.getItem('room');
  const storeName = localStorage.getItem('name');
  console.log(storeRoomId);

  return (

    <div className="App">
      {!showSocket && <div className="joinChatContainer">
        <h3>Join A Chat</h3>

        <input
          type="text"
          placeholder='John...'
          onChange={(e) => {
            setUserName(e.target.value)
          }
          }
        />

        <input
          type="text"
          placeholder='Room ID...'
          onChange={(e) => {
            setRoom(e.target.value)
          }}

        />
        <button onClick={joinRoom}>Join A room</button>
      </div>}

      {
        showSocket &&
        <Chat
          socket={socket}
          userName={userName}
          room={room}
        />
      }

    </div>
  );
}

export default App;
