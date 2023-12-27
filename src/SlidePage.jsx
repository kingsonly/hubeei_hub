import React from "react";
import { CCarouselItem } from "@coreui/react";
import { CCarousel } from "@coreui/react";
import { CImage } from "@coreui/react";
import HeaderHero from "./HeaderHero";
import "@coreui/coreui/dist/css/coreui.min.css";

//after:bottom-10 after:h-[300px] after:z-20 after:z-20 after:block  after:-inset-1  after:bg-gradient-to-b after:from-transparent after:to-black after:to-black
//${settings.backgound}

//after:top-[69.9%]  after:h-[200px] after:z-20  after:z-10 after:w-[100%] after:bg-gradient-to-t after:from-[${settings.background}] after:via-transparent after:to-transparent after:block after:absolute after:-inset-1
//top: "69.9%",
function Slide({ handleOpen, data, settings }) {
  const afterStyles = {
    height: "200px",
    zIndex: 20,
    width: "100%",
    backgroundImage: `linear-gradient(to top, ${settings.background}, transparent)`,
    display: "block",

    right: "-1px",

    left: "-1px",
  };

  const hexToRGBA = (hex, alpha) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const beforeStyles = {
    zIndex: 10,
    width: "78%",
    backgroundImage: `linear-gradient(to right, ${hexToRGBA(
      settings.background,
      0.2
    )} 20%, transparent 100%)`,
    display: "block",
    position: "absolute",
    top: "-1px",
    right: "-1px",
    bottom: "-1px",
    left: "-1px",
  };

  return (
    <div>
      <div style={beforeStyles}></div>
      <CCarousel>
        {data?.length > 0 ? (
          data.map((item) => (
            <CCarouselItem key={item.id}>
              <HeaderHero
                imageUrl={`https://api.hubeei.skillzserver.com/public${item.thumbnail}`}
                handleOpen={handleOpen}
                data={item}
                settings={settings}
              />
            </CCarouselItem>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </CCarousel>
      <div
        className="absolute bottom-[-2px] sm:bottom-[10.01%]"
        style={afterStyles}
      ></div>
    </div>
  );
}

export default Slide;
