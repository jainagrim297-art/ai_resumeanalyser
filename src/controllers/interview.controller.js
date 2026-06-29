const pdfParse = require("pdf-parse")
const { generateInterviewReport: generateInterviewReportAi } = require("../services/ai.service.js")
const interviewReportModel = require("../models/interviewReport.model.js")

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of  user self description on the basis of userself description , resume pdf and job description
 * @access private
 * @acc
 */


async function generateInterviewReport(req , res){
    try {
        const resumeFile = req.file

        if (!resumeFile) {
            return res.status(400).json({ message: "Resume file is required" });
        }

        const resumeContent = await pdfParse(req.file.buffer)
        const { selfDescription , jobDescription} = req.body

        const interviewReportByAi = await generateInterviewReportAi({
            resume : resumeContent.text,
            jobDescription,
            selfDescription
        })

        const interviewReport = new interviewReportModel({
            user : req.user.id,
            resume : resumeContent.text,
            jobDescription,
            selfDescription,
            ...interviewReportByAi
        })

        await interviewReport.save()
        
        return res.status(201).json({
            message: "Interview report generated successfully",
            report: interviewReport
        });
    }
    catch(err){ 
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function getInterviewHistory(req, res) {
    try {
        const history = await interviewReportModel.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select('score jobDescription createdAt preperationPlan skillGaps');
        return res.status(200).json({ history });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { generateInterviewReport, getInterviewHistory }