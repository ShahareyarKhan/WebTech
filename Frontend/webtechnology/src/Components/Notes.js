import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import NoteContext from '../Context/Notes/NoteContext';
import { useContext } from 'react';

const Notes = () => {
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

    const deleteNote = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                },
            });
            setNotes(notes.filter((note) => note._id !== id));
        } catch (error) {
            console.error('Error deleting note:', error.message);
        }
    };

    return (
        <div className='bg-[#D6DAC8] min-h-screen '>
            <div className='w-full md:w-4/5 lg:w-2/3 mx-auto'>
                <div className='text-center text-3xl font-bold pt-9'>
                    Your Notes
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3 p-8'>
                    {notes.map(note => (
                        <div key={note.id} className="note rounded-xl relative p-2">
                            <div className='absolute top-0 flex right-0 p-2 gap-3 '>
                                <div><MdDelete className='text-3xl' onClick={() => deleteNote(note._id)}/></div>
                                {/* If you plan to implement edit functionality later, keep this div */}
                                {/* <div><MdEditSquare className='text-3xl' /></div> */}
                            </div>
                            {note.title} - {note.description}
                        </div>
                    ))}
                </div>
<a href="/addnotes">

                <div className='fixed w-[60px] h-[60px] border-2 border-black rounded-full right-9 bottom-9 lg:right-[100px] lg:bottom-[100px] flex items-center justify-center '>
                    <FaPlus className='text-3xl' />
                </div>
</a>
            </div>
        </div>
    );
};

export default Notes;
