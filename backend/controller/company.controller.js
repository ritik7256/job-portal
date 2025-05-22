import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/Cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is requreid",
                success: false
            })
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "you cannot add same company",
                success: false
            })
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        })
        return res.status(200).json({
            message: "Company created successfully",
            company,
            success: true
        })

    } catch (error) {
        console.error("Error in registerCompany:", error.message);
        return res.status(500).json({
            message: "Error in company registering",
            error: error.message,
            success: false
        });
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId: userId });
        if (!companies) {
            return res.status(404).json({
                message: "No company found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company found successfully",
            companies,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(
            fileUri.content
        )
        const logo = cloudResponse.secure_url;

        const updateData = { name, description, website, location, logo };
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "comapany updated successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}