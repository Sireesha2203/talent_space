const express = require('express');
const PDFParser = require('pdf-parse');
const { Docxtemplater } = require('docxtemplater');
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

        // Generate text output using a template
        const outputText = generateOutput(resumeText);

        // Send the generated text as response
        res.send(outputText);
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

// Function to generate output text using a template
function generateOutput(resumeText) {
    try {
        // Load a template document
        const templateContent = fs.readFileSync('template.docx', 'binary');
        const doc = new Docxtemplater();
        doc.loadZip(new Buffer.from(templateContent, 'binary'));

        // Set data to be filled in the template
        const data = {
            resumeText: resumeText,
        };

        // Apply data to the template
        doc.setData(data);
        doc.render();

        // Get the generated text
        const generatedText = doc.getZip().generate({ type: 'nodebuffer' });
        return generatedText.toString('utf8');
    } catch (error) {
        throw new Error('Error generating output text');
    }
}

// Export express router
module.exports = resumeApp;
