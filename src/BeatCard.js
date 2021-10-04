import "bootstrap/dist/css/bootstrap.css";
import { Rating } from "@material-ui/lab";
import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const BeatCard = ({ beat, handleCartButton }) => {
  const [playing, setPlaying] = useState(false);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(beat.rating);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFeedback = () => {
    handleClose();
    toast.info("Feedback submitted!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  }

  const [inCart, setInCart] = useState(false);
  const [addToCartBtnText, setAddToCartBtnText] = useState("$" + beat.price);
  const [btnColor, setBtnColor] = useState("#2CA6FF");

  const [thisBeat, setThisBeat] = useState(beat);

  useEffect(() => {
    console.log("useEffect called within BeatCard");
    setThisBeat(beat);

    if (thisBeat.inCart) {
      setAddToCartBtnText("$" + thisBeat.price);
      setBtnColor("#E93F3F");
    } else {
      setAddToCartBtnText("$" + thisBeat.price);
      setBtnColor("#2CA6FF");
    }
  }, [beat, handleCartButton]);

  const handleButtonClick = (thisBeat) => {
    console.log("beat: " + thisBeat.name + " " + thisBeat.inCart);
    let tempBeat = thisBeat;

    tempBeat.inCart = !tempBeat.inCart;

    setThisBeat(tempBeat);

    if (thisBeat.inCart) {
      setAddToCartBtnText("$" + thisBeat.price);
      setBtnColor("#E93F3F");
      toast.info("Added " + beat.name + " to cart", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    } else {
      setAddToCartBtnText("$" + thisBeat.price);
      setBtnColor("#2CA6FF");
      toast.error("Removed " + beat.name + " from cart", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    }

    handleCartButton(thisBeat, thisBeat.inCart);
  };

  const cartTooltip = () => {
    return thisBeat.inCart ? "Remove beat from cart" : "Add beat to cart";
  };

  return (
    <div key={thisBeat.id}>
      <Tippy content={cartTooltip()}>
        <button
          onClick={() => {
            handleButtonClick(thisBeat);
          }}
          class="addToCartBtn"
          style={{
            display: "flex",
            marginBottom: "10px",
            backgroundColor: btnColor,
          }}
        >
          {thisBeat.inCart ? (
            <img src="https://img.icons8.com/ios-glyphs/24/ffffff/delete-sign.png" />
          ) : (
            <img src="https://img.icons8.com/material-sharp/24/ffffff/shopping-cart.png" />
          )}
          {addToCartBtnText}
        </button>
      </Tippy>

      <video
        loop
        controlsList="nodownload"
        disablePictureInPicture
        style={{ border: "1px solid black" }}
        onPlay={() => {
          setPlaying(true);
        }}
        onPause={() => {
          setPlaying(false);
        }}
        id={thisBeat.id}
        width="450"
        height="auto"
        src={thisBeat.video}
        controls
        type="video/mp4"
      ></video>

      <div style={{ display: "flex" }}>
        <div>{thisBeat.name}</div>
        <div style={{ marginLeft: "10px" }}>
          <Tippy content="Rate this beat">
            <Rating
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onClick={handleShow}
              value={value}
            />
          </Tippy>
        </div>
        <div style={{ marginLeft: "10px" }}>
          {" "}
          {playing ? (
            <div>
              <img src="https://img.icons8.com/material-outlined/24/fa314a/play-button-circled--v1.png" />{" "}
            </div>
          ) : (
            <div>
              <img src="https://img.icons8.com/material-outlined/24/ffffff/circled-pause.png" />{" "}
            </div>
          )}
        </div>
      </div>
      <div style={{ fontSize: "13px", color: "#838383" }}>{thisBeat.prod}</div>

      <>
        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <Trans i18nKey="give" />
              {thisBeat.prod} <Trans i18nKey="about" /> "{thisBeat.name}"
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Rating name="read-only" value={value} readOnly />
            </div>
            <div style={{ marginBottom: "15px", marginTop: "8px" }}>
              <Trans i18nKey="thankYou" /> {thisBeat.prod}{" "}
              <Trans i18nKey="about" /> "{thisBeat.name}".
            </div>
            <div>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control className="textarea" as="textarea" rows={5} />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              <Trans i18nKey="cancel" />
            </Button>
            <Button variant="primary" onClick={handleFeedback}>
              <Trans i18nKey="submitFeedback" />
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default BeatCard;
