import Audio from "./audio";
import Pdfdisplay from "./pdfdisplay";
import Video from "./video";
import Engagement from "./engagement";

const Contents = ({ data, withEngagmnet = false }) => {
  const renderFileContent = () => {
    console.log("i am the main", data);
    if (withEngagmnet) {
      return <Engagement content={data} />;
    } else {
      switch (data.content_type) {
        case "audio":
          return <Audio data={data} />;
        case "video":
        case "link":
          return <Video data={data} />;
        case "pdf":
          return <Pdfdisplay data={data} />;
        case "engagement":
          return <Engagement content={data} />;
      }
    }
  };

  return (
    <div>
      <div className="Content">{renderFileContent()}</div>
    </div>
  );
};

export default Contents;
