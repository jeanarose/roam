import React, { useContext, useState } from "react";
import API from "../../utils/API";
import "./CreateTrip.css";
import TripForm from "../../components/TripForm/TripForm";
import { useHistory, useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const CreateTrip = () => {
  // add trip button to send to server
  const history = useHistory();
  const { userId } = useParams();
  const { email, _id } = useContext(UserContext);
  const [loadingState, setLoadingState] = useState("");

  const handleFormSubmit = (e, formObject) => {
    e.preventDefault();
    setLoadingState("is-loading");
    API.createTrip(formObject)
      //TODO: // use context to set signed in user as tripCreator

      .then((response) => {
        // console.log(response.data);

        history.push(`/user/${userId}/trips`);
        
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half ">
          <h1 className="title">Create a Trip</h1>
          <TripForm
            tripCreatorId={userId}
            tripCreatorEmail={email}
            buttonText="Add Trip"
            handleFormSubmit={handleFormSubmit}
            loadingState={loadingState}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
