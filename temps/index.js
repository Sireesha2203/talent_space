const Tesseract = require('tesseract.js');

const pdfPoppler = require('pdf-poppler');
const fs = require('fs');

// Function to convert PDF to images
async function convertPDFToImages(pdfPath, outputDir) {
    try {
        const opts = {
            format: 'jpeg', // Output image format (can be 'jpeg', 'png', or 'tiff')
            out_dir: outputDir, // Output directory where images will be saved
            out_prefix: 'page', // Prefix for output image files
            page: null // Convert all pages. You can specify individual pages by passing an array like [1, 3, 4]
        };

        const result = await pdfPoppler.convert(pdfPath, opts);
        console.log('Images converted successfully:', result);

        return result;
    } catch (error) {
        console.error('Error converting PDF to images:', error);
        throw error;
    }
}

// Usage example
const pdfFilePath = 'resume.pdf';
const outputDirectory = 'pages';

convertPDFToImages(pdfFilePath, outputDirectory)
    .then(images => {
        console.log('Images saved successfully:', images);
    })
    .catch(error => {
        console.error('Error:', error);
    });

async function performOCR(imageUrl, language) {
    try {
        const result = await Tesseract.recognize(
            imageUrl,
            language,
            { logger: m => console.log(m) }
        );
        return result.data.text;
    } catch (error) {
        console.error("Error performing OCR:", error);
        throw error;
    }
}

async function main() {
    const imageUrl = 'pages/page-2.jpg'; // Image URL for OCR
    const language = 'eng'; // Language for OCR (English)

    try {
        const text = await performOCR(imageUrl, language);
        console.log("Recognized text:");
        console.log(text);
    } catch (error) {
        console.error("OCR process failed:", error);
    }
}

main();
