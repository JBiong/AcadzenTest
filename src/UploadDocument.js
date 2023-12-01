import React, { useRef, useState, useEffect } from "react";
import "./UploadDocument.css";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from 'react';


function UploadDocument() {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [newFile, setNewFile] = useState(null);

        // Fetch uploaded files from the backend when the component mounts
        const fetchUploadedFiles = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/document/files');
                if (!response.ok) {
                    throw new Error('Failed to fetch uploaded files.');
                }
                const data = await response.json();

                console.log('Fetched Files:', data);
    
                setUploadedFiles(prevFiles => {
                    Cookies.set('uploadedFiles', JSON.stringify(data));
                    localStorage.setItem("uploadedFiles", JSON.stringify(data));
                    return data;
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
                    formData.append('document', new Blob([JSON.stringify({ documentTitle: selectedFile.name, fileType: fileType })], { type: 'application/json' }));
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
    
    

    const handleFileEditChange = (e, index) => {
        const file = e.target.files[0];

        if (file && editIndex !== null) {
            // Set the new file in the edit state for this index
            setEditStates((prevStates) => {
                const newStates = [...prevStates];
                newStates[index] = {
                    ...newStates[index],
                    newFile: file,
                };
                return newStates;
            });
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


const handleSaveEdit = async (index) => {
    try {
        console.log('Save edit clicked. EditIndex:', index);
        if (index !== null && newFileName.trim() !== "") {
            const documentID = uploadedFiles[index]?.documentID;
            console.log('Document ID before update:', documentID);
            const newFile = editStates[index]?.newFile;

            console.log('Document ID:', documentID);
            console.log('New File:', newFile);

            if (!documentID) {
                console.error('Document ID not found for editIndex:', index);
                return;
            }

            const formData = new FormData();
            formData.append('document', new Blob([JSON.stringify({ documentTitle: newFileName })], { type: 'application/json' }));

            // Append the new file if it exists
            if (newFile) {
                formData.append('file', newFile);
            }

            // Add this console.log to inspect the uploadedFiles array
            console.log('Uploaded Files before update:', uploadedFiles);

            const response = await fetch(`http://localhost:8080/api/document/update/${documentID}`, {
                method: 'PUT',
                body: formData,
                headers: {},
            });

            console.log('Response Status:', response.status);
            const responseBody = await response.text();
            console.log('Response Body:', responseBody);

            if (!response.ok) {
                throw new Error('File update failed. Please try again.');
            }

            const updatedFiles = uploadedFiles.map((file, i) => {
                if (i === index) {
                    return {
                        documentID: documentID,
                        documentTitle: newFileName || file.documentTitle,
                        fileType: newFile ? getFileType(newFile.name) : file.fileType,
                        fileSize: newFile ? formatFileSize(newFile.size) : file.fileSize,
                    };
                } else {
                    return file;
                }
            });

            setUploadedFiles(updatedFiles);
            handleCancelEdit(index);

            toast.success('File successfully updated!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 500,
            });
        } else {
            toast.error('Please provide a new name to update.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
        }
    } catch (error) {
        console.error('Error in handleSaveEdit:', error);
        toast.error(error.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
        });
    }
};      
    

    const handleGenerateClick = (index) => {
        // Implement your generate logic here
        console.log("Generate button clicked for index:", index);
    };

    // Add ToastContainer at the root level of your component tree
    return (
    <>
    <div className="welcome-back-page">
    <div className="lsbody">
        <AppBar style={{background: 'none', boxShadow: 'none', padding: '10px', marginTop: '20px'}}>
            <Toolbar>
                <img src= "/logo.png" alt="App Logo" style={{width: 100, marginLeft: '50px'}}/>
                <Typography variant="h3" style={{fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '40px',color: '#B18A00'}}
                >AcadZen
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '10px', marginLeft: '50px'}}>
                    <div style={{ background: 'white', borderRadius: '15px', textAlign: 'center', height: '55px', width: '1101px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
                        <Typography variant="h4" style={{ fontFamily: "Roboto Condensed", fontSize: '35px',color: '#332D2D', textAlign: 'center' }}
                        >Document to Flashcard Converter
                        </Typography>
                    </div>
                </div>
                <Box style={{ background: 'white', borderRadius: '10px', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '70px'}}>
                    <Box style={{ background: '#FAC712', borderRadius: '10px', width: '50px', height: '50px'}}>
                        <IconButton color="black" style={{ fontSize: '45px'}}>
                        <HomeIcon style={{ fontSize: '80%', width: '100%'}} />
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
                            uploadedFiles.map((file, index) => (
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
                                    <IconButton onClick={() => handleGenerateClick(index)} >
                                    <img src="/convertIcon.png" alt="Generate Icon" style={{ width: '24px', height: '24px' }} />
                                    </IconButton>
                                    {editIndex === index ? (
                                    <div>
                                        {/* Input field for new file name */}
                                        <label htmlFor={`newFileNameInput-${file.documentID}`}>
                                        New File Name:
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
                                        Choose New File:
                                        </label>
                                        <input
                                        type="file"
                                        onChange={(e) => handleFileEditChange(e, index)}
                                        id={`fileInput-${file.documentID}`}
                                        style={{ display: 'none' }}
                                        />
                                        <label htmlFor={`fileInput-${file.documentID}`}>
                                        <IconButton component="span">
                                            <EditIcon />
                                        </IconButton>
                                        </label>
                                        <IconButton onClick={() => handleSaveEdit(index)}>
                                        <SaveIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleCancelEdit(index)}>
                                        <CancelIcon />
                                        </IconButton>
                                    </div>
                                    ) : (
                                    <div>
                                        <IconButton onClick={() => handleEditClick(index)}>
                                        <EditIcon />
                                        </IconButton>
                                    </div>
                                    )}
                                    <IconButton > 
                                    <DeleteIcon />
                                    </IconButton>
                                </div>
                                </div>
                            ))
                            ) : (
                            <p>No uploaded files available.</p>
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



{/* Confirmation Modal */}
                        {/* {showConfirmation && (
                            <div className="confirmation-modal">
                                <h1 style={{ margin: '10px 10px 20px 50px', fontWeight: 'bold' }}>Kaya pa ang Project?</h1>
                                <p>Kung di na kaya, Salig lang, laban lang then give up <br /> Dinasure? Awh Merry Christmas Yeeeheeey...</p>
                                <button onClick={() => setShowConfirmation(false)}>Cancel</button>
                                <button style={{ background: '#FAC712' }} onClick={() => { confirmationCallback(); setShowConfirmation(false); }}>Confirm</button>
                            </div>
                        )} */}

                            // const handleFileChange = (e, index, documentID) => {
    //     const file = e.target.files[0];
    
    //     if (file) {
    //         setSelectedFile(file);
    
    //         const reader = new FileReader();
    //         reader.onload = (event) => {
    //             const contentArray = new Uint8Array(event.target.result);
    //             // You can use contentArray if needed
    //         };
    //         reader.readAsArrayBuffer(file);
    
    //         setEditStates((prevStates) => {
    //             const newStates = [...prevStates];
    //             newStates[index] = {
    //                 ...newStates[index],
    //                 newFile: file,
    //             };
    //             return newStates;
    //         });
    //     }
    // };

    // const handleEditClick = (index) => {
    //     setEditIndex(index);
    //     setNewFileName(uploadedFiles[index].documentTitle);
    //     setNewFile(null);
    // };

    // const handleEditClick = (index) => {
    //     setEditIndex(index);
    //     setNewFileName("");
    //     // setNewFile(null);


    // setEditStates((prevStates) => {
    //     const newStates = [...prevStates];
    //     newStates[index] = {
    //         newFileName: "",
    //         newFile: null,
    //     };
    //     return newStates;
    // });
    
    //     // Trigger click on the hidden file input
    //     // const fileInput = document.getElementById(`fileInput-${index}`);
    //     const fileInputId = `fileInput-${index}`;
    //     const fileInput = document.getElementById(fileInputId);
    //     if (fileInput) {
    //         fileInput.click();
    //     }
    // };

    // onClick={() => handleDelete(index)}