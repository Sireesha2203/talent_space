const express = require('express');
const PDFParser = require('pdf-parse');
const multer = require('multer');
const axios = require('axios');
//// const { GoogleGenerativeAI } = require("@google/generative-ai");//for google gen ai model

const resumeApp = express.Router();
const upload = multer();
// Access your API key as an environment variable (see "Set up your API key" above)
//// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const COHERE_API_KEY = process.env.COHERE_API_KEY;

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

        const prompt = `Following will be a resume text categorize this in to sections in json format without any acknowledgements, only return the json data for the following text:
        ${resumeText}`

        ////USING Google Gen AI

        
        // For text-only input, use the gemini-pro model
        //const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        // const result = await model.generateContent(prompt);
        // const response = await result.response;
        // const text = response.text();
        // console.log(text);
        // res.send(text);
        

        // Using Cohere API
        const response = await axios.post('https://api.cohere.ai/generate', {
            prompt: prompt,
            max_tokens: 5000,
        }, {
            headers: {
                'Authorization': `Bearer ${COHERE_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        const genText=response.data.text.replace(/```/g, '').trim()

        const jsonStartIndex = genText.indexOf('{');
        const jsonEndIndex = genText.lastIndexOf('}') + 1;
        const jsonString = genText.substring(jsonStartIndex, jsonEndIndex);
        
        const jsonObject = JSON.parse(jsonString);
        res.json(jsonObject);
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
