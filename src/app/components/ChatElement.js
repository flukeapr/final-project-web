import React, { useEffect } from "react";
import { SendHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast, Bounce } from "react-toastify";

export default function ChatElement({ user,getUnreadMessage }) {
  const [message, setMessage] = React.useState("");
  const [dataMessage, setDataMessage] = React.useState([]);
  
  const { data: session } = useSession();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;
    try {
        setDataMessage(prev=> [...prev,
            {
                fromSelf: true,
                message: message,
                createAt: new Date()
            }
        ])
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          from: session.user.id,
          to: user.id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("");
        toast.success("ส่งข้อความสําเร็จ");
      }
    } catch (error) {}
  };
  const getMessage = async () => {
    try {
      const res = await fetch(`/api/chat/${session.user.id}/${user.id}`);
      const data = await res.json();
      if(res.status===200){
        
        setDataMessage(data.message);
       
      }else if(res.status===400){
        setDataMessage([]);
      }
      
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const markMessagesAsRead = async () => {
    try {
      const res = await fetch(`/api/chat/${session.user.id}/${user.id}`, {
        method: "PUT",
      });
  
      if (res.ok) {
        console.log("Marked messages as read successfully");
      } else {
        console.error("Failed to mark messages as read");
      }
    } catch (error) {
      console.error("Mark messages as read error:", error);
    }
  };
  
  useEffect(() => {
    getMessage();
    setMessage("");
    markMessagesAsRead();
    getUnreadMessage();
  }, [user]);
  

  function formatTime(createAt) {
    const date = new Date(createAt);
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  return (
    <>
      <div className="h-[90%] w-full p-4 overflow-y-scroll">
        {dataMessage.length > 0 &&
          dataMessage.map((message, index) => (
            <>
            {!message.fromSelf ?(
                <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={user.image}
                    />
                  </div>
                </div>
               
                <div className="chat-bubble ">
                 {message.message}
                </div>
                <div className="chat-footer">
                    <time className="text-xs opacity-50"> {formatTime(message.createAt)} </time>
                </div>
              </div>
            ):(
                <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src={session.user.image} />
                  </div>
                </div>
               
                <div className="chat-bubble ">{message.message}</div>
                <div className="chat-footer">
                    <time className="text-xs opacity-50"> {formatTime(message.createAt)}</time>
                </div>
              </div>
            )}
              
              
            
            </>
          ))}
          {dataMessage.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <h1 className="text-4xl font-bold">No message</h1>
            </div>
          )}
      </div>

      <div className="flex items-center h-[10%]  w-full">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-[90%]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
        />
        <button className="btn bg-white w-[10%]">
          <SendHorizontal color="#f97316" onClick={handleSendMessage} />
        </button>
      </div>
    </>
  );
}
