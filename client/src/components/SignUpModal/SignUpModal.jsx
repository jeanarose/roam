import React, { useState } from "react";
import API from "../../utils/API";
import "./SignUpModal.css";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";

const SignUpModal = ({ closeSignUpModal, setUserContext }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      // TODO: display an error message that the user need to complete both fields (use global alert)
      //avoid getElementbyId -- React conditional rendering
      console.log("error");
      document.getElementById("signup-error").classList.remove("is-hidden");
    } else {
      document.getElementById("signup-error").classList.add("is-hidden");
      API.createUser({
        email: email,
        password: password,
      })
        .then((response) => {
          console.log(response.data);
          jwt.verify(
            response.data.token,
            process.env.REACT_APP_SECRET,
            (err, data) => {
              if (err) {
                // TODO:  display an error message to the user stating that the sign-up failed (use global alert)
                console.log(err);
              } else {
                console.log(data);
                setUserContext({ userId: data._id });
                history.push(`/user/${data._id}/edit`);
              }
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="modal is-active fade-in-modal">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Sign Up</p>
            <button
              className="delete"
              aria-label="close"
              onClick={closeSignUpModal}
            ></button>
          </header>

          <section className="modal-card-body">
            <form className="control">
              <strong>
                <p>Email</p>
              </strong>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
              </div>
              <strong>
                <p className="mt-4">Password</p>
              </strong>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <span className="icon is-small is-left">
                    <i class="fas fa-key"></i>
                  </span>
                </div>
              </div>
              <input type="submit" className="is-hidden" />
              <p id="signup-error" className="mt-2 ml-2 is-hidden">
                Please complete both fields before submitting
              </p>
            </form>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary" onClick={handleSubmit}>
              Sign Up
            </button>
            <button className="button" onClick={closeSignUpModal}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default SignUpModal;
