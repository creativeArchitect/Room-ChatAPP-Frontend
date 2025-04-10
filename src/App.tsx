import { useEffect, useRef, useState } from "react"


function App() {
  const [messages, setMessages] = useState([]);
  const wsRef = useRef();
  const inputRef = useRef();

    useEffect(() => {
      const ws = new WebSocket('http://localhost:8080');
      ws.onmessage = (evt)=>{
        setMessages(m => [...m, evt.data]);
      }
      wsRef.current = ws;

      ws.onopen = ()=>{
        ws.send(JSON.stringify({
          type: "join",
          payload: {
            roomId: "red"
          }
        }))
      }
      return ()=>{
        ws.close()
      }
    },[])


  return (
    <div className="w-full h-screen flex justify-center py-5">
        <div className="">
          <div className="h-3/4 rounded-sm shadow-md w-[70vw] px-7 scroll-auto">
          {messages.map((msg, idx)=>{
            return(
                <div key={idx} className="chat-bubble bg-gray-200 rounded-md shadow-sm">{msg}</div>
              )
          })}
        </div>
          <div className="h-16 mt-1 rounded-md shadow-md w-[70vw] flex justify-center items-center gap-2 bg-slate-200">
            <input ref={inputRef}
            className="w-3/4 h-12 px-3 rounded-sm border border-gray-300" placeholder="message.." />
            <div className="bg-gray-100 rounded-md flex items-center justify-center w-30 text-lg" onClick={()=>{
              const msg = inputRef.current?.value;
              console.log(msg);
              wsRef.current.send(JSON.stringify({
                type: "chat",
                payload: {
                  message: msg,
                }
              }))
            }}>
              send
              <img width="50" height="50" src="https://img.icons8.com/plasticine/100/paper-plane.png" alt="send"/> 
            </div>
          </div>
        </div>
    </div>
  )
}

export default App
