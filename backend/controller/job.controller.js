import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirments, salary, location, jobType, experience, position, companyId } = req.body;

        const userId = req.id;
        if (!title || !description || !requirments
            || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Please fill all the fields",
                status: false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirments,
            salary,
            location,
            jobType,
            experience,
            position,
            company: companyId,
            created_by: userId

        })
        return res.status(201).json({
            message: "Job posted successfully",
            status: true,
            success: true,
            job
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "failed in job postingf",
            status: false,
            success: false
        })
    }
}

export const getAllJobs = async (req, res) => {

    try {
        const keyword = req.query.keyword || " ";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },

                { description: { $regex: keyword, $options: "i" } },
            ]
        }
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 })
        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found",
                status: false,
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true,
            status: true
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Failed to get all jobs",
            success: false
        })
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
        })
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "job fetched successfully",
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Failed to get job by id",
            success: false
        })
    }
}
//admin kitne job create kr chuka hai uski detaoils

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company"
        })
        if (!jobs) {
            return res.status(404).json({
                message: "jobs are not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}