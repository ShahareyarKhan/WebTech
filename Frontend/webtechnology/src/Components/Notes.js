import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import NoteContext from '../Context/Notes/NoteContext';
import { useContext } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: "400px",
        border: "1px solid black",
        transform: 'translate(-50%, -50%)',
    },
};

const Notes = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [notes, setNotes] = useState([]);
    const context = useContext(NoteContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/notes/fetchallnotes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': localStorage.getItem('token')
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch notes');
                }
                const data = await response.json();
                setNotes(data);
            } catch (error) {
                console.error('Error fetching notes:', error.message);
            }
        };
        fetchData();
    }, []);

    const addNote = async (e) => {
        e.preventDefault();
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
            closeModal();
        } catch (error) {
            console.error("Error adding note:", error.message);
        }
    };



    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className='bg-[#D6DAC8] min-h-screen '>
            <div className='w-full md:w-4/5 lg:w-2/3 mx-auto'>
                <div className='text-center text-3xl font-bold pt-9'>
                    Your Notes
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3 p-8'>
                    {notes.map(note => (
                        <div key={note.id} className="note rounded-xl relative p-2">

                            <div className='flex flex-col'>

                                <div className='text-xl font-semibold '>

                                    Title : {note.title}
                                </div>
                                <div className='text-sm text-center'>

                                    {note.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='fixed w-[60px] h-[60px] border-2 border-black rounded-full right-9 bottom-9 lg:right-[100px] lg:bottom-[100px] flex items-center justify-center '>
                    <FaPlus className='text-3xl' onClick={openModal} />
                </div>
                <div>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Add Note Modal"

                    >
                        <button onClick={closeModal} className='text-sm'>Close</button>
                        <h2 className='text-2xl font-semibold text-center'>Add Note</h2>
                        <form onSubmit={addNote}>
                            <div className='w-full my-4'>
                                <input type="text" className='w-full border-b border-black outline-none' placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className='w-full my-5'>
                                <textarea placeholder="Description" className='w-full border-b border-black outline-none' value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div>
                                <button type="submit" className='w-full btn bg-indigo-500 p-2 rounded'>Add Note</button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Notes;
