import specialtyService from "../services/specialtyService";

let handleUpSertSpecialty = async (req, res) => {
    try {
        let data = req.body;
        if (data && data.nameSpecialty && data.image && data.markDownContent && data.htmlContent && data.action) {
            let response = await specialtyService.handleUpSertSpecialty(data);
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

let handleGetSpecialtyDoctorInfo = async (req, res) => {
    try {
        let data = req.query;
        if (data && data.specialtyId) {
            let response = await specialtyService.handleGetSpecialtyDoctorInfo(data.specialtyId);
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
let handleGetSpecialtyById = async (req, res) => {
    try {
        let data = req.query;
        if (data && data.specialtyId) {
            let response = await specialtyService.handleGetSpecialService(data.specialtyId);
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
let handleGetSpecial = async (req, res) => {
    try {
        let response = await specialtyService.handleGetAllSpecialService();
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
let handleUpdateSpecialty = async (req, res) => {
    try {
        let data = req.body;
        if (data && data.specialtyId && data.image && data.markDownContent && data.htmlContent && data.nameSpecialty) {
            let response = await specialtyService.handleUpdateSpecialty(data);
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
let handleDeleteSpecialty = async (req, res) => {
    try {
        let data = req.body;
        if (data && data.nameSpecialty && data.specialtyId) {
            let response = await specialtyService.handleDeleteSpecialtyService(data);
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
    handleUpSertSpecialty: handleUpSertSpecialty,
    handleGetSpecialtyDoctorInfo: handleGetSpecialtyDoctorInfo,
    handleGetSpecial: handleGetSpecial,
    handleGetSpecialtyById: handleGetSpecialtyById,
    handleUpdateSpecialty: handleUpdateSpecialty,
    handleDeleteSpecialty: handleDeleteSpecialty,
}