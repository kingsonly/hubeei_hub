
import Audio from './audio';
import Pdfdisplay from "./pdfdisplay";
import Video from './video';
import Engagement from './engagement';


const Contents = ({ data }) => {

  const audioFileURL = data.file.audio;

  const renderFileContent = () => {


    switch (data.file.type) {
      case 'audio':
        return <Audio audioFileURL="/Images/Gyakie-Forever-(TrendyBeatz,com).mp3" />;
      case 'video':
        return <Video />;
      case 'pdf':
        return <Pdfdisplay />;
      case 'engagement':
        return <Engagement />

    }
  }

  return (
    <div>
      <div className="Content">
        {renderFileContent()}
      </div>
    </div>
  );
}

export default Contents;