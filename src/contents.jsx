import React, { useState } from 'react';
import Audio from './Audio';
import Pdf from './Pdf';
import Video from './video';
import Engagement from './engagement';


const Contents = () => {
    const [file, setFile] = useState(null);
  
    // Function to handle file input change
    const handleFileUpload = (event) => {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  
    // Function to render content based on file type
    const renderFileContent = () => {
      if (!file) {
        return <p>No file selected.</p>;
      }
  
      const fileType = file.type;
      
      switch (fileType) {
        case 'audio/mpeg':
          return <Audio />;
        case 'video/mp4':
          return <Video />;
        case 'application/pdf':
          return <Pdf  />;
        case 'engagement/likes':
            return <Engagement />

        default:
          return <p>Unsupported file type.</p>;
      }
    }
  
    return (
      <div>
        <input type="file" accept=".mp3,.mp4,.pdf,.engagement" onChange={handleFileUpload} />
        <div className="Content">
          {renderFileContent()}
        </div>
      </div>
    );
  }
  
  export default Contents;