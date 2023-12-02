import React from "react";
import { useState, useEffect } from "react";
//import { Box, IconButton } from '@material-ui/core';
//import HomeIcon from '@material-ui/icons/Home';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./FlashcardProgress.css";
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, DialogContentText } from "@mui/material";


export default function FlashcardManagement(){
    const [clickedDeck, setClickedDeck] = useState(null);
    const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
    const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
    const [isAddFlashcardPopupOpen, setAddFlashcardPopupOpen] = useState(false);
  
    const [deckTitles, setDeckTitles] = useState([
      'Rizal\'s Lovers',
      'UML2',
      'Scope Management',
    ]);
  
    const [flashcards, setFlashcards] = useState({
      'Rizal\'s Lovers': [
        { front: 'Who was Jose Rizal’s puppy love?', back: 'Segunda Katigbak' },
        { front: 'Unfortunately, _______’s mother disapproved of her daughter’s relationship with Rizal, who was then a known filibustero.', back: 'Leonor Rivera' },
        { front: 'Who was Jose Rizal’s true love in exile?', back: 'Josephine Bracken' }
      ],
      'UML2': [
        { front: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', back: 'Lorem ipsum' },
        { front: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', back: 'Lorem' },
      ],
    });
  
    const [newDeckTitle, setNewDeckTitle] = useState("");
    const [updatedDeckTitle, setUpdatedDeckTitle] = useState("");
    const [currentDeck, setCurrentDeck] = useState("");
  
    useEffect(() => {
      if (clickedDeck !== null) {
        setCurrentDeck(deckTitles[clickedDeck]);
      }
    }, [clickedDeck, deckTitles]);
  
    const openAddFlashcardPopup = () => setAddFlashcardPopupOpen(true);
    const closeAddFlashcardPopup = () => setAddFlashcardPopupOpen(false);
  
    const handleAddFlashcard = () => {
    };

    const [confirmationDialog, setConfirmationDialog] = useState(false);
    const closeConfirmationDialog = () => setConfirmationDialog(false);
    
  const openCreatePopup = () => setCreatePopupOpen(true);
  const closeCreatePopup = () => setCreatePopupOpen(false);

  const openUpdatePopup = () => {
    setUpdatedDeckTitle(deckTitles[clickedDeck]);
    setUpdatePopupOpen(true);
  };
  const closeUpdatePopup = () => setUpdatePopupOpen(false);

  const openDeletePopup = () => setDeletePopupOpen(true);
  const closeDeletePopup = () => setDeletePopupOpen(false);

  const [isDeckAddedConfirmationOpen, setDeckAddedConfirmationOpen] = useState(false);

  const handleCreateDeck = () => {
    if (newDeckTitle.trim() !== "") {
      setDeckTitles([...deckTitles, newDeckTitle]);
      setFlashcards({
        ...flashcards,
        [newDeckTitle]: [] // Initialize with an empty array of flashcards for the new deck
      });
      setNewDeckTitle("");
      closeCreatePopup();
      setDeckAddedConfirmationOpen(true);
    }
  };

  const [isDeckUpdatedConfirmationOpen, setDeckUpdatedConfirmationOpen] = useState(false);

  const handleUpdateDeck = () => {
    if (updatedDeckTitle.trim() !== "") {
      const updatedDecks = [...deckTitles];
      updatedDecks[clickedDeck] = updatedDeckTitle;
      setDeckTitles(updatedDecks);
      closeUpdatePopup();
      setDeckUpdatedConfirmationOpen(true);
    }
  };

  const [isDeckDeletedConfirmationOpen, setDeckDeletedConfirmationOpen] = useState(false);


  useEffect(() => {
    if (clickedDeck !== null) {
      setCurrentDeck(deckTitles[clickedDeck]);
    }
  }, [clickedDeck, deckTitles]);

  
  const [editedFront, setEditedFront] = useState("");
const [editedBack, setEditedBack] = useState("");
const [isEditFlashcardPopupOpen, setEditFlashcardPopupOpen] = useState(false);
const [editedFlashcardIndex, setEditedFlashcardIndex] = useState(null);


  const handleEditFlashcard = (index) => {
    const currentDeck = deckTitles[clickedDeck];
    const selectedFlashcard = flashcards[currentDeck][index];
    setEditedFront(selectedFlashcard.front);
    setEditedBack(selectedFlashcard.back);
    setEditedFlashcardIndex(index);
    setEditFlashcardPopupOpen(true);
  };
  
  const closeEditFlashcardPopup = () => {
    setEditFlashcardPopupOpen(false);
    setEditedFront("");
    setEditedBack("");
  };
  
  const handleConfirmEditFlashcard = () => {
    const currentDeck = deckTitles[clickedDeck];
    setFlashcards((prevFlashcards) => {
      const updatedFlashcards = [...prevFlashcards[currentDeck]];
      updatedFlashcards[editedFlashcardIndex] = { front: editedFront, back: editedBack };
      return { ...prevFlashcards, [currentDeck]: updatedFlashcards };
    });
    closeEditFlashcardPopup();
    setEditedFlashcardIndex(null);
  };
  

    return(
        <div className="wrapper">
                <div className="decksnav">
                    <div className="decks-list">
                        <div style={{display:'flex', justifyContent: 'center'}}>
                                <img src= "/logo.png" alt="App Logo" style={{width: 50}}/>
                            <Typography variant="h3" style={{fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '30px',color: '#B18A00'}}
                            >AcadZen
                            </Typography>
                        </div>
                        <div className="decks-heading">Decks</div>
                        {/*
                        <div className="deck-title">Rizal's Lovers</div>
                        <div className="deck-title">UML2</div>
                        <div className="deck-title">Scope Management</div> */}

                        {deckTitles.map((title, index) => (
                                    <button
                                    key={index}
                                    className={`deck-title ${clickedDeck === index ? 'deck-title-clicked' : ''}`}
                                    onClick={() => setClickedDeck(index)}
                                    >
                                    {title}
                                    </button>
                                ))}
                    </div>
                </div>

                <div className="header">
                <div className="heading">Flashcard Progress</div>

                <div style={{ background: 'white', borderRadius: '10px', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '70px'}}>
                    <div style={{ background: '#FAC712', borderRadius: '10px', width: '50px', height: '50px'}}>
                        
                    </div>
                </div>
                </div>
                

                
                <div className="selected-flashcard-deck">
                {clickedDeck !== null ? (
                    <div>
                    <div className="title-container" style={{ display: "flex", padding: "10px", margin: "10px", justifyContent: "center", alignItems: "center"}}>
            
                        <div className="flashcard-deck-title">
                            {deckTitles[clickedDeck]}
                        </div>
                        

                        <IconButton onClick={openUpdatePopup}>
                            <EditIcon />
                        </IconButton>
                        <Dialog open={isUpdatePopupOpen} onClose={closeUpdatePopup}>
                            <DialogTitle>Rename Deck</DialogTitle>
                            <DialogContent>
                            <TextField
                                label="Deck Title"
                                value={updatedDeckTitle}
                                onChange={(e) => setUpdatedDeckTitle(e.target.value)}
                            />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={closeUpdatePopup}>Cancel</Button>
                            <Button onClick={handleUpdateDeck}>Update</Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog open={isDeckUpdatedConfirmationOpen} onClose={() => setDeckUpdatedConfirmationOpen(false)}>
                            <DialogTitle>Deck Updated</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                The deck has been successfully updated.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setDeckUpdatedConfirmationOpen(false)}>OK</Button>
                            </DialogActions>
                        </Dialog>
                        
                    </div>
                

                    <div className="flashcards-of-selected-deck">
                        {flashcards[deckTitles[clickedDeck]] && flashcards[deckTitles[clickedDeck]].length > 0 ? (
                            flashcards[deckTitles[clickedDeck]].map((flashcard, index) => (
                            <div key={index} className="flashcard">

                                
                                <h3>Front</h3>{flashcard.front}
                                <h3>Back</h3> {flashcard.back}
                                
                                
                            </div>
                            ))
                        ) : (
                            <div style={{ alignItems: "center", textAlign: "center", padding: "20px" }}>
                            No flashcards to show.
                            </div>
                        )}
                    </div>

                </div>
                ) : (
                    <div style={{ alignItems: "center",textAlign: "center", padding: "20px" }}>
                    Select a flashcard deck to view.
                    </div>
                )}
                </div>
              
        </div>
    )
}