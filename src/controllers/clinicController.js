import clinicService from "../services/clinicService";

let handleUpSertClinic = async (req, res) => {
    try {
        let data = req.body;
        if (data && data.nameClinic && data.image && data.markDownContent && data.htmlContent && data.action && data.address) {
            let response = await clinicService.handleUpSertClinic(data);
            return res.status(200).json({
                errCode: response.errCode,
                message: response.message,
            })
        } else {
            return res.status(400).json({
                errCode: 400,
                message: "Input is Empty!"
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: 500,
            message: "error from server"
        })
    }
}

let handleGetClinicDoctorInfo = async (req, res) => {
    try {
        let data = req.query;
        if (data && data.clinicId) {
            let response = await clinicService.handleGetClinicDoctorInfo(data.clinicId);
            return res.status(200).json({
                errCode: response.errCode,
                message: response.message,
                data: response.data,
            })
        } else {
            return res.status(400).json({
                errCode: 400,
                message: "Input is Empty!"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "error from server"
        })
    }
}
let handleGetClinicById = async (req, res) => {
    try {
        let data = req.query;
        if (data && data.clinicId) {
            let response = await clinicService.handleGetClinicService(data.clinicId);
            return res.status(200).json({
                errCode: response.errCode,
                message: response.message,
                data: response.data,
            })
        } else {
            return res.status(400).json({
                errCode: 400,
                message: "Input is Empty!"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "error from server"
        })
    }
}
let handleGetClinic = async (req, res) => {
    try {
        let response = await clinicService.handleGetAllClinicService();
        return res.status(200).json({
            errCode: response.errCode,
            message: response.message,
            data: response.data,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "error from server"
        })
    }
}
let handleUpdateClinic = async (req, res) => {
    try {
        let data = req.body;
        if (data && data.clinicId && data.image && data.markDownContent && data.htmlContent && data.nameClinic) {
            let response = await clinicService.handleUpdateClinic(data);
            return res.status(200).json({
                errCode: response.errCode,
                message: response.message,
            })
        } else {
            return res.status(400).json({
                errCode: 400,
                message: "Input is Empty!"
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: 500,
            message: "error from server"
        })
    }
}
let handleDeleteClinic = async (req, res) => {
    try {
        let data = req.body;
        if (data && data.nameClinic && data.clinicId) {
            let response = await clinicService.handleDeleteClinicService(data);
            return res.status(200).json({
                errCode: response.errCode,
                message: response.message,
            })
        } else {
            return res.status(400).json({
                errCode: 400,
                message: "Input is Empty!"
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: 500,
            message: "error from server"
        })
    }
}
module.exports = {
    handleUpSertClinic: handleUpSertClinic,
    handleGetClinicDoctorInfo: handleGetClinicDoctorInfo,
    handleGetClinic: handleGetClinic,
    handleGetClinicById: handleGetClinicById,
    handleUpdateClinic: handleUpdateClinic,
    handleDeleteClinic: handleDeleteClinic,
}