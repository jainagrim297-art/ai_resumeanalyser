const { GoogleGenAI } = require("@google/genai"); // Note: Assuming you are using the newest SDK based on your initialization
const { z } = require('zod');
const puppeteer = require("puppeteer");

// Initialize the client
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Your Zod Schema
const interviewReportSchema = z.object({
    technicalQuestions: z.array(z.object({
        question: z.string().description("The technical question to be asked"),
        intention: z.string().description("The interviewer's underlying intention"),
        answer: z.string().description("The ideal answer"),
        followUpQuestions: z.array(z.string()),
        explanation: z.string().description("Why this question matters"),
        strengths: z.array(z.string().description("Candidate's advantages for this question based on resume")),
        weaknesses: z.array(z.string().description("Candidate's blind spots for this question")),
        topicsToLearn: z.array(z.string())
    })),
    behavioralQuestions: z.array(z.object({
        question: z.string(),
        answer: z.string(),
        explanation: z.string(),
        strengths: z.array(z.string()),
        weaknesses: z.array(z.string()),
        topicsToLearn: z.array(z.string())
    })),
    skillGaps: z.array(z.object({
        skill: z.string(),
        severity: z.enum(["Low", "Medium", "High"]),
        explanation: z.string(),
        topicsToLearn: z.array(z.string())
    })),
    preperationPlan: z.array(z.object({ // Note: "preparation" is misspelled here, keeping it to match your original schema
        topic: z.string(),
        notes: z.string()
    }))
});

// Fixed async function syntax
const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {
    
    // The master prompt from above
    const systemPrompt = `You are an elite Technical Recruiter and Senior Staff Engineer at a top-tier tech company. Your objective is to conduct a hyper-personalized, critical analysis of a candidate preparing for an upcoming job interview. 

You will be provided with three inputs:
1. The Candidate's Resume
2. The Target Job Description
3. A Self-Description provided by the candidate

Your task is to synthesize these inputs and generate a comprehensive, structured interview preparation report. Do not provide generic advice. Every question, skill gap, and preparation step must be explicitly tied to the intersection of the candidate's actual experience and the job's specific requirements.

### ANALYSIS DIRECTIVES:

1. TECHNICAL QUESTIONS (Tailored to the Stack & Role):
- Generate questions that directly test the skills mentioned in the Job Description, especially those where the candidate's resume shows potential weakness or superficial knowledge.
- For "strengths", explicitly map why the candidate is equipped to answer this based on their resume.
- For "weaknesses", identify where they might stumble based on what is missing from their resume/self-description.
- Provide a robust "explanation" and "topicsToLearn" to guide their study.

2. BEHAVIORAL QUESTIONS (Culture & Experience Fit):
- Base these on the seniority of the role. If it's a junior role, focus on adaptability and teamwork. If senior, focus on system design trade-offs, conflict resolution, and leadership.
- Anticipate the "intention" behind what a hiring manager is actually looking for.

3. SKILL GAPS (The Reality Check):
- Brutally and honestly assess what the candidate is missing. 
- Rate "severity" strictly: 
  - 'High' = Core requirement missing. 
  - 'Medium' = Important but can be learned on the job. 
  - 'Low' = Nice-to-have or peripheral skill.

4. PREPARATION PLAN:
- Create an actionable, bulleted study guide. Do not just say "learn React". Say "Review React hooks (specifically useEffect and useMemo) as they are heavily utilized in the target company's core stack."

### STRICT CONSTRAINTS:
- Output strictly in the requested JSON format.
- Ensure all arrays have at least 3 high-quality items.
- Maintain a professional, encouraging, yet highly critical and objective tone.`;

    // Combine the system instructions with the actual user data
    const finalPrompt = `
        ${systemPrompt}
        
        INPUT DATA:
        ---
        Candidate Resume: 
        ${resume}
        
        Job Description: 
        ${jobDescription}
        
        Self Description: 
        ${selfDescription}
        ---
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: finalPrompt, // Fixed typo: 'constents' -> 'contents'
            config: {
                responseMimeType: "application/json",
                responseSchema: interviewReportSchema,
                temperature: 0.2 // Keep temperature low (0.1 - 0.3) for more analytical, predictable JSON outputs
            }
        });

        // The SDK handles JSON parsing automatically when using responseSchema
        return JSON.parse(response.text); 
        
    } catch (error) {
        console.error("Error generating interview report:", error);
        throw error;
    }
}


async function generateInterviewQuestions({resume, jobDescription}){


}

async function generateResumePDF({resume , selfDescription , jobDescription }){

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setContent(`
        <html>
            <body>
                <h1>Interview Report</h1>
                <pre>${resume}</pre>
                <pre>${selfDescription}</pre>
                <pre>${jobDescription}</pre>
            </body>
        </html>
    `);

    await page.pdf({
        path: 'report.pdf',
        format: 'A4',
    });

    await browser.close();
    return 'report.pdf';
}

module.exports = { generateInterviewReport }