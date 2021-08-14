import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const BubblePage = (props) => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService(setColors)
  }, [])

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth()
      .put(`/colors/${editColor.id}`, editColor)
      .then(res => {
        setColors(colors.map(color => {
          if(color.id === res.data.id){
            return res.data
          } else {
            return color
          }
        }))
        setEditing(false);
      })
      .catch(err => {
        console.log("cannot update colors at this time", err);
      })
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
      .delete(`/colors/${colorToDelete.id}`, colorToDelete)
      .then(res => {
        setColors(colors.filter(color => color.id !== res.config.id))
      })
      .catch(err => {
        console.log("Cannot delete color at this time", err);
      })
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
