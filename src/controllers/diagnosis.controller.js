const diagnosisService = require('../services/diagnosis.service');

/**
 * Controller to handle diagnosis API requests.
 */
exports.diagnosePatient = async (req, res, next) => {
    try {
        // 1. Extract the symptoms sent in the POST request body
        const { symptoms } = req.body;

        // 2. Simple validation
        if (!symptoms) {
            return res.status(400).json({ 
                success: false, 
                message: "Symptoms are required" 
            });
        }

        // 3. Pass data to the Service layer to execute business logic
        const diagnosisData = await diagnosisService.createDiagnosis(symptoms);

        // 4. Return success response to the client
        res.status(201).json({
            success: true,
            data: diagnosisData,
            message: "Diagnosis created and saved successfully"
        });
    } catch (error) {
        next(error); // Pass any errors to our global error middleware
    }
};

/**
 * Controller to fetch all diagnosis history.
 */
exports.getDiagnosisHistory = async (req, res, next) => {
    try {
        // Optional query parameter for sorting (e.g., ?sort=asc)
        const sortOrder = req.query.sort || 'desc';

        const history = await diagnosisService.getDiagnosisHistory(sortOrder);

        res.status(200).json({
            success: true,
            count: history.length,
            data: history,
            message: "Diagnosis history fetched successfully"
        });
    } catch (error) {
        next(error); // Pass to global error middleware
    }
};
