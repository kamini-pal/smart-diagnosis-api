# Smart Diagnosis AI API

A production-ready Node.js & Express API that leverages OpenAI and an NLP Rule-Based Hybrid Engine alongside MongoDB to provide intelligent diagnostic suggestions based on reported patient symptoms.

## 🚀 Features
* **Hybrid AI Pathology Diagnosis**: Utilizes the OpenAI API for symptom analysis. If the API rate limits or fails, the system seamlessly triggers an exhaustive built-in Rule-Based NLP dictionary mapping to mathematically guarantee 2 to 3 accurate conditions.
* **Chronological History Tracking**: All symptom queries and their resulting diagnoses are automatically archived in MongoDB.
* **Production-Ready Architecture**: 
  * Clean separation of concerns (Routes → Controllers → Services → Models).
  * Isolated server execution layer (`server.js`) and app config (`app.js`).
  * Global Error Middleware for deterministic crash prevention.
* **Pure API Focus**: Stripped strictly to its backend components, perfect for automated Postman testing and programmatic integration.

## 📡 Live Endpoints (Render Deployment)
If this backend is deployed on Render, prefix the endpoints with your live URL (e.g. `https://smart-diagnosis-api-3qqw.onrender.com`). Otherwise use `http://localhost:8000`.

### 1. Submit Symptoms for Diagnosis
* **Route**: `POST /diagnose`
* **Description**: Accepts a symptom string, passes it through the AI/Hybrid intelligence engine, stores the analysis, and returns exactly 2-3 matched conditions.
* **Request Body (JSON)**:
  ```json
  {
      "symptoms": "I have had a mild fever and persistent cough for 3 days."
  }
  ```
* **Response Body (JSON)**:
  ```json
  {
      "success": true,
      "data": {
          "symptoms": "I have had a mild fever and persistent cough for 3 days.",
          "result": [
              {
                  "condition": "Viral Infection",
                  "probability": "82%",
                  "suggested_next_steps": "Rest, monitor temperature, and consult a doctor if fever lasts > 3 days."
              },
              {
                  "condition": "Influenza (Flu)",
                  "probability": "65%",
                  "suggested_next_steps": "Stay hydrated, take over-the-counter medicine, and isolate."
              }
          ]
      },
      "message": "Diagnosis created and saved successfully."
  }
  ```

### 2. Fetch Diagnosis History
* **Route**: `GET /history?sort=desc`
* **Description**: Retrieves all historical MongoDB diagnoses in chronologically sorted order. 

### 3. Server Health Check
* **Route**: `GET /api/v1/health`
* **Description**: Evaluates the uptime and health status of the API server.

## 🛠 Local Setup & Installation

**Prerequisites:** Node.js (v18+) and a MongoDB URI.

1. Clone this repository and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=8000
   DB_URI=mongodb+srv://<user>:<password>@cluster0.abcde.mongodb.net/smart-diagnosis
   OPENAI_API_KEY=sk-your-openai-key-here
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🧠 Diagnostic Engine Logic Explained
1. **Stateless AI Processing**: The backend explicitly forces OpenAI to return targeted JSON properties (`condition`, `probability`, `suggested_next_steps`) safely into a standardized array without conversational fluff.
2. **NLP Hybrid Fallback**: The biggest production upgrade resides in the `catch` block of the service layer. If OpenAI's billing expires (Error 429), the code intercepts the exception and executes an internal keyword-mapping algorithm against a medical dictionary, ensuring exactly 2 or 3 accurate conditions are returned entirely independently of external cloud APIs.
