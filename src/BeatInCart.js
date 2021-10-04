import { Trans, useTranslation } from "react-i18next";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const BeatInCart = ({ beat, removeBeat }) => {
  const handleButtonClick = (beat) => {
    handleButtonClick(beat);
  };

  const handleOnClickRemove = (beat) => {
    beat.inCart = false;
    removeBeat(beat);
    toast.error("Removed " + beat.name + " from cart", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <div key={beat.name}>
      <Tippy content="Remove beat from cart">
        <button
          onClick={() => {
            handleOnClickRemove(beat);
          }}
          class="addToCartBtn"
          style={{
            display: "flex",
            marginBottom: "10px",
            backgroundColor: "#E93F3F",
          }}
        >
          <div>
            <img src="https://img.icons8.com/ios-glyphs/24/ffffff/delete-sign.png" />{" "}
          </div>
          ${beat.price}
        </button>
      </Tippy>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <video
          controlsList="nodownload"
          disablePictureInPicture
          style={{ border: "1px solid black" }}
          id={beat.id}
          width="230px"
          height="auto"
          src={beat.video}
          type="video/mp4"
        ></video>
      </div>

      <div style={{ display: "flex" }}>
        <div>{beat.name}</div>
        <div style={{ marginLeft: "10px" }}></div>
        <div style={{ marginLeft: "10px" }}> </div>
      </div>
      <div style={{ fontSize: "13px", color: "#838383" }}>{beat.prod}</div>
    </div>
  );
};

export default BeatInCart;
