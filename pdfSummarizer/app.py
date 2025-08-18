from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
from transformers import pipeline

app = FastAPI()

# Allow frontend requests (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for testing, later restrict to your Angular app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load summarizer model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@app.post("/summarize-pdf/")
async def summarize_pdf(file: UploadFile = File(...)):
    # Extract text from PDF
    reader = PyPDF2.PdfReader(file.file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""

    # Summarize (limit input length for model)
    if len(text) > 1000:
        text = text[:1000]

    summary = summarizer(text, max_length=200, min_length=50, do_sample=False)
    return {"summary": summary[0]['summary_text']}
