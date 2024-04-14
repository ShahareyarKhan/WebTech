// NoteContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [mode, setMode] = useState("white");
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes data from backend API
    getNotes();
  }, []);
useEffect(()=>{
    getNotes()
},[notes])
  const getNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notes/fetchallnotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  const addNote = async (title, description) => {
    try {
      const response = await fetch("http://localhost:5000/api/notes/addnote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) {
        throw new Error("Failed to add note");
      }
      const newNote = await response.json();
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error("Error adding note:", error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  const editNote = async (id, title, description) => {
    try {
      await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description }),
      });
      setNotes(
        notes.map((note) =>
          note._id === id ? { ...note, title, description } : note
        )
      );
    } catch (error) {
      console.error("Error editing note:", error.message);
    }
  };

  const value = {
    mode,
    username,
    setMode,
    setUsername,
    notes,
    getNotes,
    addNote,
    deleteNote,
    editNote,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export const useNoteContext = () => {
  return useContext(NoteContext);
};
