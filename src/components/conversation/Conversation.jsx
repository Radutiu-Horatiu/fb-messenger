import React, { useRef, useState } from "react";

import { doc, getDoc, updateDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import "./conversation.css";

export default function Conversation({ receiver, user }) {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);

  const currentMessage = useRef(null);

  // handle sending the messages
  const sendMessage = async () => {
    const myMessage = {
      message: currentMessage.current.value,
      uid: user.uid,
    };

    // add and save message to firestore
    const conversationRef = doc(db, "conversations", conversationId);
    const docSnap = await getDoc(conversationRef);

    // append message to existing conversation
    if (docSnap.exists()) {
      const docData = docSnap.data();
      await updateDoc(conversationRef, {
        messages: [...docData.messages, myMessage],
      });
    } else {
      // create a new conversation
      await setDoc(doc(db, "conversations", conversationId), {
        messages: [myMessage],
      });
    }

    currentMessage.current.value = "";
  };

  // set conversationId
  React.useEffect(() => {
    if (!receiver || !user) return;

    let myConvId;

    if (receiver.uid > user.uid) myConvId = receiver.uid + user.uid;
    else myConvId = user.uid + receiver.uid;

    setConversationId(myConvId);
  }, [receiver, user]);

  // get converastion from firestore
  React.useEffect(() => {
    if (!conversationId) return;

    const unsub = onSnapshot(
      doc(db, "conversations", conversationId),
      (doc) => {
        const currentData = doc.data();

        if (currentData?.messages.length > 0) setMessages(currentData.messages);
        else setMessages([]);
      }
    );

    return unsub;
  }, [conversationId]);

  return (
    <div>
      {receiver ? (
        <div>
          <p>Conversation with {receiver.email}</p>

          {/* Conversation messages */}
          <div className="conversation-messages">
            {messages.map((obj, i) => (
              <div
                key={i}
                className="message-container"
                style={{ justifyContent: obj.uid === user.uid && "flex-end" }}
              >
                <div className="message-bubble">{obj.message}</div>
              </div>
            ))}
          </div>

          {/* Input bar */}
          <div className="input-container">
            <div className="input-message">
              <input placeholder="Hi.." ref={currentMessage} />
            </div>
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      ) : (
        <div>
          <p>Pick someone to talk to.</p>
        </div>
      )}
    </div>
  );
}
