import React, { useRef, useState, useEffect } from "react";
import "./UploadDocument.css";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'; 

function UploadDocument() {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [newFile, setNewFile] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationCallback, setConfirmationCallback] = useState(null);
    const [documentToDelete, setDocumentToDelete] = useState(null);

    // Fetch uploaded files from the backend when the component mounts
    const fetchUploadedFiles = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/document/files');
                if (!response.ok) {
                    throw new Error('Failed to fetch uploaded files.');
                }
                const data = await response.json();
        
                console.log('Fetched Files:', data);
        
                // Filter out deleted files (isDeleted = 0)
                const filteredFiles = data.filter(file => file.isDeleted !== 1);
        
                setUploadedFiles(prevFiles => {
                    Cookies.set('uploadedFiles', JSON.stringify(filteredFiles));
                    localStorage.setItem("uploadedFiles", JSON.stringify(filteredFiles));
                    return filteredFiles;
                });
            } catch (error) {
                console.error(error.message);
            }
        };
 
        useEffect(() => {
            // Fetch uploaded files from the backend when the component mounts and when the page is refreshed
            fetchUploadedFiles();
        }, []);
        useEffect(() => {
            // Load uploaded files from localStorage when the component mounts
            const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
            setUploadedFiles(storedFiles);
        }, []);

        // Save uploaded files to localStorage whenever the uploadedFiles state changes
        useEffect(() => {
            localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
        }, [uploadedFiles]);


    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
            setSelectedFile(file);
    
            const reader = new FileReader();
            reader.onload = (event) => {
                const contentArray = new Uint8Array(event.target.result);
                // You can use contentArray if needed
            };
            reader.readAsArrayBuffer(file);
    
            setNewFile(file);
        }
    };     
    
    const formatFileSize = (size) => {
        if (typeof size !== 'number') {
            // Handle the case where size is not a valid number
            return 'Unknown size';
        }
    
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    
        let index = 0;
        while (size >= 1024 && index < units.length - 1) {
            size /= 1024;
            index++;
        }
    
        return `${size.toFixed(2)} ${units[index]}`;
    };
    

    const handleUploadClick = async () => {
        if (selectedFile) {
            const fileType = getFileType(selectedFile.name);
    
            if (['pdf', 'docx', 'pptx', 'txt'].includes(fileType)) {
                try {
                    const formData = new FormData();
                    formData.append('document', new Blob([JSON.stringify({ documentTitle: selectedFile.name, fileType: fileType, isDeleted: 0 })], { type: 'application/json' }));
                    formData.append('file', selectedFile);
    
                    const response = await fetch('http://localhost:8080/api/document/upload', {
                        method: 'POST',
                        body: formData,
                        headers: {},
                    });
    
                    if (!response.ok) {
                        throw new Error('File upload failed. Please try again.');
                    }
    
                    const data = await response.json();
    
                    const newFile = {
                        documentID: data.documentID,
                        documentTitle: selectedFile.name,
                        fileType: fileType,
                        fileSize: formatFileSize(selectedFile.size),
                    };
    
                    setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
                    setSelectedFile(null);
    
                    toast.success('File successfully uploaded!', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 500,
                    });
                } catch (error) {
                    toast.error(error.message, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1000,
                    });
                    setSelectedFile(null);
                }
            } else {
                toast.error('Unsupported file type. Please choose a different file.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
                setSelectedFile(null);
            }
        }
    };
    

    const getFileType = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        return extension;
    };

    const [editIndex, setEditIndex] = useState(null);
    const [newFileName, setNewFileName] = useState("");
    const [editStates, setEditStates] = useState([]);

    // Initialize the edit state for this index

    const handleEditClick = (index) => {
        console.log('Edit clicked for index:', index);
        setEditIndex(index);
        setNewFileName("");
    
        // Initialize the edit state for this index
        setEditStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = {
                newFileName: uploadedFiles[index]?.documentTitle || "",
                newFile: null,
            };
            return newStates;
        });
    
        // Trigger click on the hidden file input
        const fileInputId = `fileInput-${index}`;
        const fileInput = document.getElementById(fileInputId);
        if (fileInput) {
            fileInput.click();
        }
    };

    const [replacementFile, setReplacementFile] = useState(null);
    
    const handleReplaceFile = async (index) => {
        try {
            const documentID = uploadedFiles[index]?.documentID;

            if (!documentID) {
                console.error("Document ID not found for index:", index);
                return;
            }
            
            // Check if newFileName is empty and replacementFile is not provided
            if (!newFileName && !replacementFile) {
            toast.warning("Please provide a new file name or choose a new file.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            return;
        }

            const formData = new FormData();
            const newFileNameValue = newFileName || uploadedFiles[index]?.documentTitle;
            formData.append(
                "document",
                new Blob([JSON.stringify({ documentTitle: newFileNameValue })], {
                    type: "application/json",
                })
            );

            // Append the new file if it exists
            if (replacementFile) {
                formData.append("file", replacementFile);
            }

            const response = await fetch(
                `http://localhost:8080/api/document/update/${documentID}`,
                {
                    method: "PUT",
                    body: formData,
                    headers: {
                        // Add any required headers here
                    },
                }
            );

            console.log("Response Status:", response.status);
            const responseBody = await response.text();
            console.log("Response Body:", responseBody);

            if (!response.ok) {
                throw new Error("File update failed. Please try again.");
            }

            // Fetch the updated files after successful replacement
           await fetchUploadedFiles();

            const updatedFiles = uploadedFiles.map((file, i) =>
                i === index
                    ? {
                          documentID: documentID,
                          documentTitle: newFileNameValue, 
                          fileType: replacementFile
                              ? getFileType(replacementFile.name)
                              : file.fileType,
                          fileSize: replacementFile
                              ? formatFileSize(replacementFile.size)
                              : file.fileSize,
                      }
                    : file
            );

            setUploadedFiles(updatedFiles);
            handleCancelEdit();
            toast.success("File successfully updated!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 500,
            });
        } catch (error) {
            console.error("Error in handleReplaceFile:", error);
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
        }
    };

    const handleFileReplaceChange = (e) => {
        const file = e.target.files[0];
        setReplacementFile(file);

        // Display file info after selecting a replacement file
        if (file) {
            console.log("Replacement File Selected:", file.name);
            console.log("File Size:", formatFileSize(file.size));
        }
    }; 

    const handleCancelEdit = () => {
    setEditIndex(null);
    setNewFileName("");
    setNewFile(null);

    // Clear the edit state for this index
    setEditStates((prevStates) => {
        const newStates = [...prevStates];
        if (editIndex !== null) {
            newStates[editIndex] = {
                newFileName: "",
                newFile: null,
            };
        }
        return newStates;
    });
};

      // Delete

      const handleDeleteConfirmation = async (documentID) => {
        try {
            
            const response = await fetch(`http://localhost:8080/api/document/delete/${documentID}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete document. Please try again.');
            }
    
            // Fetch the updated files after successful soft deletion
            const updatedFiles = await fetchUploadedFiles();

            setUploadedFiles(prevFiles => {
            // Update the state using the functional form
            const filteredFiles = updatedFiles && updatedFiles.filter(file => file.isDeleted !== 1);

            if (filteredFiles) {
                Cookies.set('uploadedFiles', JSON.stringify(filteredFiles));
                localStorage.setItem("uploadedFiles", JSON.stringify(filteredFiles));
            }
        
            return filteredFiles || prevFiles;  // Return prevFiles if filteredFiles is undefined

        }); 
    
            toast.success('Document successfully deleted!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 500,
            });
        } catch (error) {
            console.error('Error in handleDeleteClick:', error);
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
        }
    };

    /// Confirmation Modal

    const handleDeleteClick = (documentID) => {
        // Set the document ID to be deleted
        setDocumentToDelete(documentID);

        // Set the confirmation callback and display the modal
        setConfirmationCallback(() => () => handleDeleteConfirmation(documentID));
        setShowConfirmation(true);
    };

    const handleGenerateClick = (index) => {
        // Implement your generate logic here
        console.log("Generate button clicked for index:", index);
    };

    // Add ToastContainer at the root level of your component tree
    return (
        <>
            <ToastContainer />
            <div className="welcome-back-page">
                <div className="lsbody">
                    <AppBar style={{ background: 'none', boxShadow: 'none', padding: '10px', marginTop: '20px' }}>
                        <Toolbar>
                            <img src="/logo.png" alt="App Logo" style={{ width: 100, marginLeft: '50px' }} />
                            <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '40px', color: '#B18A00' }}
                            >AcadZen
                            </Typography>
                            <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '10px', marginLeft: '50px' }}>
                                <div style={{ background: 'white', borderRadius: '15px', textAlign: 'center', height: '55px', width: '1101px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                                    <Typography variant="h4" style={{ fontFamily: "Roboto Condensed", fontSize: '35px', color: '#332D2D', justifyContent: 'center', marginTop: '3px' }}
                                    >Document to Flashcard Converter
                                    </Typography>
                                </div>
                            </div>
                            <Box style={{ background: 'white', borderRadius: '10px', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '70px' }}>
                                <Box style={{ background: '#FAC712', borderRadius: '10px', width: '50px', height: '50px' }}>
                                    <IconButton color="black" style={{ fontSize: '45px' }}>
                                        <HomeIcon style={{ fontSize: '80%', width: '100%' }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Toolbar>
                    </AppBar>

                    <div className="upload-document-content">

                        <div className="left-panel">
                            {/* File preview or document icon */}
                            {selectedFile ? (
                                <div style={{ marginBottom: '10px', width: '100%' }}>
                                    {getFileType(selectedFile.name) === 'pdf' ? (
                                        <embed src={URL.createObjectURL(selectedFile)} type="application/pdf" width="40%" height="300px" />
                                    ) : getFileType(selectedFile.name) === 'docx' ? (
                                        // Displaying a placeholder icon for DOCX files
                                        <img
                                            src="/docx.png"
                                            alt="DOCX Icon"
                                            style={{ width: '40%', height: '300px' }}
                                        />
                                    ) : getFileType(selectedFile.name) === 'pptx' ? (
                                        // Displaying a placeholder icon for PPT files
                                        <img
                                            src="/pptx.png"
                                            alt="PPT Icon"
                                            style={{ width: '40%', height: '300px' }}
                                        />
                                    ) : getFileType(selectedFile.name) === 'txt' ? (
                                        // Displaying a placeholder icon for TXT files
                                        <img
                                            src="/txt.png"
                                            alt="TXT Icon"
                                            style={{ width: '40%', height: '300px' }}
                                        />
                                    ) : (
                                        // Displaying an image for unsupported file types
                                        <img
                                            src="/error.png"
                                            alt="error Icon"
                                            style={{ width: '40%', height: '300px' }}
                                        />
                                    )}
                                </div>
                            ) : (
                                <img
                                    src="/document icon.png"
                                    alt="Document Icon"
                                    style={{ width: 100, marginTop: '130px', marginBottom: '30px' }}
                                />
                            )}

                            {/* Display file name or Supported document types */}
                            {selectedFile ? (
                                <Typography
                                    variant="h4"
                                    style={{
                                        fontFamily: 'Roboto Condensed',
                                        fontSize: '20px',
                                        color: 'black',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        fontStyle: 'italic',
                                        marginTop: '15px',
                                    }}
                                >
                                    {selectedFile.name}
                                </Typography>
                            ) : (
                                <Typography
                                    variant="h4"
                                    style={{
                                        fontFamily: 'Roboto Condensed',
                                        fontSize: '20px',
                                        color: 'black',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        marginTop: '10px',
                                    }}
                                >
                                    Supported document types: PDF, DOCX, TXT, PPTX
                                </Typography>
                            )}

                            {/* Browse Button */}
                            <div style={{ marginTop: '70px' }}>
                                <Button style={{ background: '#FAC712', width: '230px', height: '45px', borderRadius: '10px' }} onClick={handleBrowseClick}>
                                    <Typography style={{ fontSize: '20px', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', color: '#332D2D', textTransform: 'none' }}>
                                        Browse
                                    </Typography>
                                </Button>
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                            </div>

                            {/* Upload Document Button */}
                            <Button style={{ background: '#FAC712', width: '230px', height: '45px', borderRadius: '10px', marginTop: '150px' }} onClick={handleUploadClick}>
                                <Typography style={{ fontSize: '20px', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', color: '#332D2D', textTransform: 'none' }}>
                                    Upload Document
                                </Typography>
                            </Button>
                        </div>

                        {/* Right Panel for Displaying Uploaded Files */}
                        <div className="right-panel">
                        <Typography variant="h4" style={{ fontFamily: 'Roboto Condensed', fontSize: '30px', color: '#332D2D', textAlign: 'left', margin: '0px 10px 5px 10px' }}>
                            Uploaded Documents
                        </Typography>
                        <div className='uploadedFilePanel'>
                            {uploadedFiles.length > 0 ? (
                            uploadedFiles
                            .filter(file => file.isDeleted !== 1) // Filter out deleted files
                            .map((file, index) => (
                                <div key={file.documentID} className="fileComponents">
                                {/* File icon based on the file type */}
                                {file.fileType === 'pdf' && <img src="/pdf.png" alt="PDF Icon" style={{ width: '60px', margin: '5px 10px 5px 15px' }} />}
                                {file.fileType === 'docx' && <img src="/docxIcon.png" alt="DOCX Icon" style={{ width: '60px', margin: '5px 10px 5px 15px' }} />}
                                {file.fileType === 'pptx' && <img src="/pptx.png" alt="PPT Icon" style={{ width: '60px', margin: '5px 10px 5px 15px' }} />}
                                {file.fileType === 'txt' && <img src="/txtIcon.png" alt="TXT Icon" style={{ width: '55px', margin: '8px 10px 8px 15px' }} />}

                                {/* Display file information */}
                                {file.documentTitle && file.fileSize && (
                                    <div style={{ margin: '10px' }}>
                                    <Typography variant="h6" style={{ fontFamily: 'Roboto Condensed', fontWeight: 'bold' }}>{file.documentTitle}</Typography>
                                    <Typography variant="body2">{file.fileSize}</Typography>
                                    {/* Add other file information as needed */}
                                    </div>
                                )}
                                <div className="file-actions">
                                        <IconButton onClick={() => handleGenerateClick(index)}>
                                            <img src="/convertIcon.png" alt="Generate Icon" style={{ width: '24px', height: '24px' }} />
                                        </IconButton>
                                        {editIndex === index ? (
                                            <div>
                                                {/* Display selected file */}
                                                {editStates[editIndex]?.newFile && (
                                                    <Typography
                                                        variant="h5"
                                                        style={{
                                                            fontFamily: 'Roboto Condensed',
                                                            fontSize: '18px',
                                                            color: 'black',
                                                            textAlign: 'center',
                                                            fontWeight: 'bold',
                                                            marginTop: '15px',
                                                        }}
                                                    >
                                                        Selected File: {editStates[editIndex].newFile.name}
                                                    </Typography>
                                                )}

                                                {/* Input field for new file name */}
                                                <Box className="inputContainer">
                                                    <label htmlFor={`newFileNameInput-${file.documentID}`}>
                                                        New File Name: &nbsp;
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id={`newFileNameInput-${file.documentID}`}
                                                        placeholder="Enter new file name"
                                                        value={newFileName}
                                                        onChange={(e) => setNewFileName(e.target.value)}
                                                        style={{ marginRight: '10px' }}
                                                    />

                                                    {/* Input field for choosing a new file */}
                                                    <label htmlFor={`fileInput-${file.documentID}`}>
                                                        <br /> Choose New File:
                                                        <IconButton component="span">
                                                                    <ChangeCircleIcon />
                                                                </IconButton>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        onChange={handleFileReplaceChange}
                                                        id={`fileInput-${file.documentID}`}
                                                        style={{ display: 'none' }}

                                                    />
                                                    <IconButton
                                                        style={{ marginRight: '5px', background: '#9CCC65' }}
                                                        onClick={() => handleReplaceFile(index)} // Updated function name
                                                    >
                                                        <SaveIcon />
                                                    </IconButton>
                                                    <IconButton style={{ background: '#EF5350' }} onClick={() => handleCancelEdit(index)}>
                                                        <CancelIcon />
                                                    </IconButton>
                                                </Box>
                                            </div>
                                        ) : (
                                            <div>
                                                <IconButton onClick={() => handleEditClick(index)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </div>
                                            
                                        )}
                                        <IconButton onClick={() => handleDeleteClick(file.documentID)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </div>    
                            ))
                                ) : (
                                <p>No uploaded files available.</p>
                                )}
                            {showConfirmation && (
                                <div className="confirmation-modal">
                                    <h1 style={{ margin: '10px 10px 20px 50px', fontWeight: 'bold', fontFamily: "Roboto", fontSize: "30px"}}>Delete?</h1>
                                    <p style={{fontFamily: "Roboto", fontSize: "20px", marginRight: "20px"}}>Deleting this document will erase all data permanently <br /> Are you sure? This cannot be undone</p>
                                    <button onClick={() => setShowConfirmation(false)}>Cancel</button>
                                    <button style={{ background: '#FAC712' }} onClick={() => { confirmationCallback(); setShowConfirmation(false); }}>Confirm</button>
                                </div>
                                )}
                            </div>
                        </div>                      
                    </div>
                </div>
            </div>
        </>
    );
}

export default UploadDocument;
