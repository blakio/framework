import React, { useState, useEffect } from "react";
import "./main.css";

import moment from "moment";

import Axios from "../../../../Axios";

import {
    Paper
} from "../../components";

import { StateContext } from "Context/State";

const Notes = () => {
    const [state, dispatch] = StateContext();

    const [newNote, setNewNotes] = useState("");
    const [notes, setNotes] = useState([]);

    const getNotes = () => {
        Axios.findWeeklyNotes({
            query: {
                employeeId: state.timeSheet.clockIn.selectedEmployee._id,
                weekNumber: moment().week(),
                year: moment().year()
            }
        }).then(data => {
            const notes = [];
            data.data.map(d => notes.push(d))
            setNotes(notes)
        })
    }

    useEffect(() => {
        getNotes();
    }, []);

    const getValue = value => value.note;

    const onDelete = (note) => {
        Axios.deleteWeeklyNote(note._id).then(data => {
            getNotes();
        }).catch(err => console.log(err));
    };

    const onClick = newNote => {
        Axios.createWeeklyNote({
            note: newNote,
            weekNumber: moment().week(),
            year: moment().year(),
            employeeId: state.timeSheet.clockIn.selectedEmployee._id
        }).then(data => {
            setNewNotes("");
            getNotes();
        }).catch(err => console.log(err))
    }

    return (<div>
        <Paper
            title="Notes for week"
            color="green"
        >
            {notes.map((data, index) => (
                <div className="notesHolder" key={index}>
                    <p>{getValue(data)}</p>
                    <button className="cancelBtn" onClick={() => onDelete(data)}>x</button>
                </div>
            ))}
            <div className="weeklyNoteTextareaContainer">
                <textarea maxLength="50" placeholder="max 50 characters" value={newNote} onChange={e => setNewNotes(e.target.value)}></textarea>
                <button className="submitBtn" onClick={() => onClick(newNote)}>Submit</button>
            </div>
        </Paper>
    </div>)
}

export default Notes;