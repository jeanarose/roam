import React, { useEffect, useState } from "react";
import "./EditUser.css";
import API from "../../utils/API";
import { useParams, useHistory, Link } from "react-router-dom";

const EditUser = () => {
  const { userId } = useParams();
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userId) {
      API.getUser(userId)
        .then((response) => {
          console.log(response);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let preStoreEmail = email;
    API.editUser(userId, {
      firstName: firstName,
      lastName: lastName,
      email: preStoreEmail.toLowerCase(),
      password: password,
    })
      .then((response) => {
        console.log(response);
        history.push(`/user/${response.data._id}/trips`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // NEED TO UPDATE THE IMAGE WITH EDIT FUNCTIONALITY
  return (
    <div className="container">
      <h1 className="title has-text-centered">Edit Account</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="columns is-centered is-vcentered">
          <div className="column is-3">
            <figure className="image is-128x128">
              <img
                className="is-rounded"
                src="https://placekitten.com/128/128"
              />
            </figure>
            <p>Edit your picture</p>
          </div>
          <div className="column is-5">
            <div className="field">
              <label className="label">First Name</label>
              <div className="control">
                <input
                  name="firstName"
                  className="input"
                  type="text"
                  placeholder="e.g Alex"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Last Name</label>
              <div className="control">
                <input
                  name="lastName"
                  className="input"
                  type="text"
                  placeholder="e.g. Smith"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  name="email"
                  className="input"
                  type="email"
                  placeholder="e.g. alexsmith@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="columns is-vcentered">
              <div className="column is-narrow">
                <button
                  type="submit"
                  className="button is-primary mr-4 is-size-5"
                >
                  Update
                </button>
              </div>
              <div className="column is-3">
                <Link to={`/user/${userId}/trips`} className="skip-link">
                  Skip this Step
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
