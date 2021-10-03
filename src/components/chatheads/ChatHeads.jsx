import React from "react";
import "./chatheads.css";

export default function ChatHeads({ items, setReceiver }) {
  return (
    <div>
      <p>Chatheads</p>
      {items.map((obj, i) => (
        <div
          key={i}
          className="chat-head-item"
          onClick={() => setReceiver(obj)}
        >
          <div className="user-profile-pic-container">
            <p className="user-profile-pic-text">{obj.email[0]}</p>
          </div>
          <p>{obj.email}</p>
        </div>
      ))}
    </div>
  );
}
