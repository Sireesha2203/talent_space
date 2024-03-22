const express = require('express');
const PDFParser = require('pdf-parse');
const multer = require('multer');

const resumeApp = express.Router();
const upload = multer();

// API endpoint to parse resume file
resumeApp.post('/parse-resume', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        const pdfBuffer = req.file.buffer; // Get the buffer of the uploaded PDF file

        // Parse the uploaded resume file
        const resumeText = await parseResume(pdfBuffer);
        console.log(resumeText)
        res.send(resumeText);
    } catch (error) {
        console.error('Error processing resume:', error);
        res.status(500).send('Error processing resume');
    }
});

// Function to parse PDF resume from buffer
async function parseResume(pdfBuffer) {
    try {
        const pdfText = await PDFParser(pdfBuffer);
        return pdfText.text;
    } catch (error) {
        throw new Error('Error parsing resume');
    }
}


// Export express router
module.exports = resumeApp;
