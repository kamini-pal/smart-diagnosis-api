# Smart Diagnosis API

A production-ready Node.js API that leverages OpenAI and MongoDB to provide intelligent diagnostic suggestions based on reported patient symptoms. 

## 🚀 Features
* **AI-Powered Pathology Diagnosis**: Utilizes the OpenAI API and strict prompt engineering to analyze symptoms and generate structured medical condition predictions.
* **Chronological History Tracking**: All symptom queries and their resulting AI diagnoses are automatically archived chronologically in MongoDB.
* **Production-Ready Architecture**: 
  * Clean separation of concerns (Routes → Controllers → Services → Models).
  * Isolated server execution layer (`server.js`) and application configuration layer (`app.js`).
  * Global Error Middleware for deterministic crash prevention and formatted client responses.
* **Secure Environment Configuration**: Critical secrets (DB URIs, AI API keys) decoupled using `.env` for safe cloud deployments.

## 📡 API Endpoints

### 1. Submit Symptoms for Diagnosis
* **Route**: `POST /api/v1/diagnose`
* **Description**: Accepts a symptom string, passes it through the AI intelligence engine, stores the analysis, and returns the result.
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
          "symptoms": "...",
          "result": [
              {
                  "disease": "Upper Respiratory Infection",
                  "probability": "85%",
                  "suggestion": "Rest, stay hydrated, and monitor temperature."
              }
          ],
          "createdAt": "2026-04-02T10:00:00Z"
      },
      "message": "Diagnosis created and saved successfully"
  }
  ```

### 2. Fetch Diagnosis History
* **Route**: `GET /api/v1/diagnose/history?sort=desc`
* **Description**: Retrieves all historical MongoDB diagnoses in chronologically sorted order. 
* **Parameters**: `?sort=asc` (Oldest first) or `?sort=desc` (Newest first, default).

### 3. Server Health Check
* **Route**: `GET /api/v1/health`
* **Description**: Evaluates the uptime and status of the application layer.

## 🛠 Setup & Installation

**Prerequisites:** 
* Node.js (v18+ recommended)
* A local MongoDB instance or a cloud MongoDB Atlas URI
* An OpenAI API Key

**Installation:**
1. Clone this repository to your local machine.
2. Install the core dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=3000
   DB_URI=mongodb://localhost:27017/smart-diagnosis
   OPENAI_API_KEY=sk-your-secure-openai-key-here
   ```
4. Start the development server (auto-restarts on code changes):
   ```bash
   npm run dev
   ```
   *The server will mount on `http://localhost:3000`*.

## 🧠 AI Integration Breakdown
The core of the diagnosis feature is driven programmatically by the OpenAI SDK (specifically GPT-4o-mini).
* **Stateless Prompt Engineering**: When symptoms are submitted via the controller, the backend Service layer constructs a highly restrictive "System Prompt." The AI is instructed to bypass conversational pleasantries and output its logic exclusively as strict JSON containing targeted properties (`disease`, `probability`, `suggestion`).
* **Deterministic Configuration**: The OpenAI completion request relies on a deliberately low `temperature` mapping (0.3). This effectively silences "creative hallucination" and forces the generative model to stick strictly to factual, robust diagnostic pathways. 
* **Seamless Database Piping**: Rather than manually scraping strings on the backend, the raw returned JSON array from the AI is instantly injected directly into the Mongoose `Diagnosis` Schema mapping, where it is validated and safely persisted onto MongoDB.
