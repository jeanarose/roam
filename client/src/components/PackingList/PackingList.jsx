import React, { useState, useEffect } from "react";
import API from "../../utils/API";

const PackingList = ({ userId, tripId }) => {
  const [item, setItem] = useState("");
  const [itemEditing, setItemEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [list, setList] = useState([{}]);

  useEffect(() => {
    getPackingListItems();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      packingListCreator: userId,
      trip: tripId,
      item: item,
      packed: false,
    };


    API.createItem(newItem)
      .then((response) => {
        console.log(response.data);
        getPackingListItems();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPackingListItems = () => {
    API.getPackingListItems(tripId).then((response) => {
      console.log(response.data);
      const listArray = [];
      response.data.forEach((item) => {
        listArray.push({ id: item._id, item: item.item, packed: item.packed });
      });
      console.log(listArray);
      setList(listArray);
      setItem("");
    }).catch((err) => {
      console.log(err);
    });

  }

  const deleteItem = (e) => {
    
    const itemId = e.target.dataset.id
    API.deleteItem(itemId).then((response) =>{
      console.log(response);
      console.log("deleted");
      getPackingListItems();
    })

    
  };

  const togglePacked = (id) => {
    const updatedList = [...list].map((item) => {
      if (item.id === id) {
        item.packed = !item.packed;
      }
      return item;
    });

    setList(updatedList);
  };

  const editItem = (id) => {
    const updatedList = [...list].map((item) => {
      if (item.id === id) {
        item.text = editingText;
      }
      return item;
    });
    setList(updatedList);
    setEditingText("");
    setItemEditing(null);
  };

  return (
    <div>
      <div className="columns is-centered">
        <div className="column is-5">
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              placeholder="Add an item"
              value={item}
              name="text"
              onChange={(e) => setItem(e.target.value)}
            />
            <div className="control">
              <button className="button" type="submit">
                <i className="fas fa-plus fa-lg"></i>
              </button>
            </div>
          </form>
          {list.map((item) => (
            <div key={item.id}>
              <div className="columns">
                <div className="column is-10">
                  <input
                    type="checkbox"
                    onChange={() => togglePacked(item.id)}
                    checked={item.packed}
                  />
                  {itemEditing === item.id ? (
                    <input
                      type="text"
                      onChange={(e) => setEditingText(e.target.value)}
                      value={editingText}
                    />
                  ) : (
                    <div>{item.item}</div>
                  )}

                  <button data-id={item.id} onClick={deleteItem}>Delete</button>
                  {itemEditing === item.id ? (
                    <button onClick={() => editItem(item.id)}>Save</button>
                  ) : (
                    <button onClick={() => setItemEditing(item.id)}>
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackingList;
