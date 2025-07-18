import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

const Editor = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on('load-document', (data) => setText(data));
    socket.on('receive-changes', (data) => setText(data));

    return () => socket.disconnect();
  }, []);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    socket.emit('send-changes', newText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          📝 Real-time Collaborative Editor
        </h1>
        <textarea
          value={text}
          onChange={handleChange}
          className="w-full h-[400px] p-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner resize-none"
          placeholder="Start typing here..."
        ></textarea>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Changes are synced in real-time with others using this editor.
        </p>
      </div>
    </div>
  );
};

export default Editor;
