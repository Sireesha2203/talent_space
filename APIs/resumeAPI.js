const express = require('express');
const PDFParser = require('pdf-parse');
const multer = require('multer');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const resumeApp = express.Router();
const upload = multer();
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        const prompt = `This is a resume categorize this in to sections in json format without any acknowledgements, only return the json data:
        ${resumeText}`

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        res.send(text);
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
