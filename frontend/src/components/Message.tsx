
import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";

const ChatInput = () => {
  const [file, setFile] = useState<File | null>(null); 
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
     audio: true, // Enables audio recording
    // audioBitsPerSecond: 128000, // Optional: Customize audio bitrate
    onStop: async (blobUrl: string, blob: Blob) => {
      console.log("Recording complete!", blobUrl);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSend = async () => {
    setIsUploading(true);
    const formData = new FormData();


    if (mediaBlobUrl) {
      const audioBlob = await fetch(mediaBlobUrl).then((res) => res.blob());
      formData.append("file", audioBlob, "recording.wav");
    }

 
    if (file) {
      formData.append("file", file);
    }


    if (message) {
      formData.append("content", message);
    }

    try {
      const response = await axios.post("http://localhost:8000/message", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response:", response.data);
      alert("Message sent!");
      resetInputs();
    } catch (error) {
      console.error("Error uploading:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const resetInputs = () => {
    setFile(null);
    setMessage("");
  };

  return (
    <div className="chat-input flex flex-col gap-4">
 
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        rows={3}
        className="border border-gray-300 p-2 rounded w-full"
      />

      <input
        type="file"
        onChange={handleFileChange}
        className="file-input"
        accept="audio/*,video/*,image/*"
      />

 
      <div>
        <p>Status: {status}</p>
        <button
          onClick={startRecording}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Stop Recording
        </button>
        {mediaBlobUrl && (
          <audio controls>
            <source src={mediaBlobUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>

 
      <button
        onClick={handleSend}
        disabled={isUploading || (!mediaBlobUrl && !file && !message)}
        className={`bg-green-500 text-white px-4 py-2 rounded ${
          isUploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isUploading ? "Uploading..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;
