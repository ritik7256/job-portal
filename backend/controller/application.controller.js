import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js"
export const applyJobs = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: false
            })
        }
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            })
        }
        const job = await Job.findById(jobId).populate({
            path: "applications"
        })
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        //create a new applicaiton
        const newApplication = new Application({
            job: jobId,
            applicant: userId,

        })
        await newApplication.save();
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Application created very successfully",
            success: true,
            newApplication
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Failed to apply for job",
            success: false
        })
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applicaiton = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } },
            }
        })
        if (!applicaiton) {
            return res.status(404).json({
                message: "No jobs applied",
                success: false
            })
        }
        return res.status(200).json({
            applicaiton,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

//admin will see how many user applied to this jobs;

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        })
        if (!job) {
            return res.status(404).json({
                message: "No job found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })

    } catch (error) {

    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.statsu(404).json({
                message: "status is required",
                success: true
            })
        }
        //find the application by application idl
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            })
        }
        //update the status;
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message: "Status updated successFully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}