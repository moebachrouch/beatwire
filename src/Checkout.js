import "bootstrap/dist/css/bootstrap.css";
import { Rating } from "@material-ui/lab";
import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect, createRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Header from "./Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

toast.configure();

const Checkout = ({ cart }) => {
  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  const [selectedDate, setSelectedDate] = useState(null);

  let firstNameRef = createRef();
  let lastNameRef = createRef();
  let emailRef = createRef();
  let ccRef = createRef();
  let ccvRef = createRef();
  let expiryDateRef = createRef();

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ccError, setCcError] = useState("");
  const [ccvError, setCcvError] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");

  const handleSubmitPayment = () => {
    console.log(cart);
    if (
      !validateFirstName(firstNameRef.current.value) ||
      !validateLastName(lastNameRef.current.value) ||
      !validateEmail(emailRef.current.value) ||
      !validateCc(ccRef.current.value) ||
      !validateCcv(ccvRef.current.value) ||
      !validateExpiryDate(expiryDateRef.current.value)
    ) {
      if (!validateFirstName(firstNameRef.current.value)) {
        setFirstNameError("Please enter your first name");
      } else {
        setFirstNameError("");
      }

      if (!validateLastName(lastNameRef.current.value)) {
        setLastNameError("Please enter your last name");
      } else {
        setLastNameError("");
      }

      if (!validateEmail(emailRef.current.value)) {
        setEmailError("Please enter your email address");
      } else if (!validateEmailFormat(emailRef.current.value)) {
        setEmailError(
          "Please enter a valid email address (format: email@address.com)"
        );
      } else {
        setEmailError("");
      }

      if (!validateCc(ccRef.current.value)) {
        setCcError(
          "Please enter a valid credit card number (format: 1234-1234-1234-1234)"
        );
      } else {
        setCcError("");
      }

      if (!validateCcv(ccvRef.current.value)) {
        setCcvError(
          "Please enter a valid CCV. The CCV is a 3- or 4-digit number that can be found at the back of your credit card."
        );
      } else {
        setCcvError("");
      }

      if (!validateExpiryDate()) {
        setExpiryDateError(
          "Please enter your credit card's expiry date. This number can be found at the back of your credit card."
        );
      } else {
        setExpiryDateError("");
      }
    } else {
      setFirstNameError("");
      setLastNameError("");
      setEmailError("");
      setCcError("");
      setCcvError("");
      setExpiryDateError("");

      if (cart.length === 0) {
        toast.error("Your cart is empty", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
      } else {
        toast.success("Your order has been confirmed!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
      }
    }
  };

  const validateExpiryDate = () => {
    return selectedDate !== null;
  };

  const validateFirstName = (firstName) => {
    return firstName.length != 0;
  };

  const validateLastName = (lastName) => {
    return lastName.length != 0;
  };

  const validateEmail = (email) => {
    return email.length != 0;
  };

  const validateEmailFormat = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateCc = (cc) => {
    var filter = /\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/;
    return filter.test(cc);
  };

  const validateCcv = (ccv) => {
    var filter = /^[0-9]{3,4}$/;
    return filter.test(ccv);
  };

  return (
    <div id="checkout">
      <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
        <Header
          first="purchase"
          second="beatsCap"
          title="purchaseTitle"
          imgSrc="https://img.icons8.com/ios-glyphs/40/ffffff/bank-card-back-side.png"
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "20px",
        }}
      >
        <img src="https://img.icons8.com/ios-glyphs/30/ffffff/1.png" />
        <Trans i18nKey="personalInfo"></Trans>
      </div>

      <div>
        <Form>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <Trans i18nKey="firstName" />
            </Form.Label>
            <Tippy content="Please enter your first name">
              <Form.Control type="firstName" ref={firstNameRef} />
            </Tippy>
            <div style={{ color: "#E93F3F" }}>{firstNameError}</div>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <Trans i18nKey="lastName" />
            </Form.Label>
            <Tippy content="Please enter your last name">
              <Form.Control type="lastName" ref={lastNameRef} />
            </Tippy>
            <div style={{ color: "#E93F3F" }}>{lastNameError}</div>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              <Trans i18nKey="emailAddress" />
            </Form.Label>
            <Tippy content="Please enter your email address (format: email@address.com)">
              <Form.Control type="email" ref={emailRef} />
            </Tippy>
            <div style={{ color: "#E93F3F" }}>{emailError}</div>
          </Form.Group>
        </Form>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "50px",
        }}
      >
        <img src="https://img.icons8.com/ios-glyphs/30/ffffff/2.png" />{" "}
        <Trans i18nKey="paymentInfo"></Trans>
      </div>

      <div>
        <Form>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <Trans i18nKey="creditCardNumber" />
            </Form.Label>
            <Tippy content="Please enter your credit card number (format: 1234-1234-1234-1234)">
              <Form.Control type="credit-card" ref={ccRef} />
            </Tippy>
            <div style={{ color: "#E93F3F" }}>{ccError}</div>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <Trans i18nKey="CCV" />
            </Form.Label>
            <Tippy content="The CCV is a 3- or 4-digit number found at the back of your credit card">
              <Form.Control type="ccv" ref={ccvRef} />
            </Tippy>
            <div style={{ color: "#E93F3F" }}>{ccvError}</div>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <div>
              <Form.Label>
                <Trans i18nKey="expiryDate" />
              </Form.Label>
              <Tippy content="The expiry date can be found at the back of your credit card">
                <div className="customDatePickerWidth">
                  <DatePicker
                    style={{ width: "100%" }}
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minDate={moment().toDate()}
                    placeholderText="mm/dd/yyyy"
                    ref={expiryDateRef}
                  />
                </div>
              </Tippy>
            </div>
            <div style={{ color: "#E93F3F" }}>{expiryDateError}</div>
          </Form.Group>
        </Form>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "50px",
        }}
      >
        <img src="https://img.icons8.com/ios-glyphs/30/ffffff/3.png" />{" "}
        <Trans i18nKey="confirmPurchase"></Trans>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "50px",
        }}
      >
        <Tippy content="Click this button to pay for your beats!">
          <Button onClick={handleSubmitPayment}>
            <Trans i18nKey="pay" />
          </Button>
        </Tippy>
      </div>
    </div>
  );
};

export default Checkout;
