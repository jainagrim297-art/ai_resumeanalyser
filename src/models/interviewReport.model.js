const mongoose = require('mongoose');

/**
 * - job description Schema  : String
 * - resume text 
 * - Self description (optional)
 * - Interview 
 * 
 * 
 * - score :
 * 
 * - Technical questions;[]
 * - Behavioral questions;[]
 * - Skill gaps : [
 * skill : ""
 * severity : ""
 *  enum : ["Low", "Medium", "High"]]
 * - preperation plan : [{topic : "" , notes : ""}]
 */



const technicalQuestionSchema = new mongoose.Schema({
    question : {
        type : String ,
        required : [ true , "Technical question is required"]
    },
    intention : {
        type : String ,
        required : [ true , "Intention is required"]
    },
    
    answer : {
        type : String ,
        required : [ true , "Answer is required"]
    },

    followUpQuestions : [{
        type : String,
        required : [true, "Follow up question is required"]
    }],

    explanation : {
        type : String,
        required : [true , "Explanation is required"]
    },

    strengths : [{
        type : String,
        required : [true , "Strengths is required"]
    }],

    weaknesses : [{
        type : String,
        required : [true , "Weaknesses is required"]
    }],

    topicsToLearn : [{
        type : String,
        required : [true , "Topics to learn is required"]
    }],

})

const behavioralQuestionsSchema = new mongoose.Schema({
    
    behavioralQuestion : {
        type : String,
        required : [true , "Behavioral question is required"]
    },
    answer : {
        type : String,
        required : [true , "Answer is required"]
    },
    explanation : {
        type : String,
        required : [true , "Explanation is required"]
    },
    strengths : [{
        type : String,
        required : [true , "Strengths is required"]
    }],
    weaknesses : [{
        type : String,
        required : [true , "Weaknesses is required"]
    }],
    topicsToLearn : [{
        type : String,
        required : [true , "Topics to learn is required"]
    }],

})


const skillGapsSchema = new mongoose.Schema({

    skill : {
        type : String,
        required : [true , "Skill is required"]
    },
    severity : {
        type : String,
        enum : ["Low", "Medium", "High"],
        required : [true , "Severity is required"]
    },
    explanation : {
        type : String,
        required : [true , "Explanation is required"]
    },
    topicsToLearn : [{
        type : String,
        required : [true , "Topics to learn is required"]
    }],

})

const PreperationGapSchema = new mongoose.Schema({

    skill : {
        type : String,
        required : [true , "Skill is required"]
    },
    severity : {
        type : String,
        enum : ["Low", "Medium", "High"],
        required : [true , "Severity is required"]
    },
    explanation : {
        type : String,
        required : [true , "Explanation is required"]
    },
    topicsToLearn : [{
        type : String,
        required : [true , "Topics to learn is required"]
    }],

})

const interviewReportSchema = new mongoose.Schema({
  jobDescription : { type : String ,
     required : [true, "job description is required"]},

     resume : { type : String , required : [true , "Resume is required"]},

     selfDescription : { type : String },

     interview : { type : String , required : [true , "Interview is required"]},

     score : { type : String , required : [true , "Score is required"]},

     

     behavioralQuestions: [behavioralQuestionsSchema],
     technicalQuestions: [technicalQuestionSchema],
     skillGaps: [skillGapsSchema],
     preperationPlan: [PreperationGapSchema],
     user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "user",
         required: [true, "User is required"]
     }
}, { timestamps: true })
const interviewReportModel = mongoose.model("InterviewReport" , interviewReportSchema);

module.exports = interviewReportModel;