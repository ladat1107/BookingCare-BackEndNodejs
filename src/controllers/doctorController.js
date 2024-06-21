import doctorService from "../services/doctorService";
let getTopDoctor = async (req, res) => {
    try {
        let limit = req.query.limit;
        if (!limit) {
            limit = 10;
        }
        let response = await doctorService.getTopDoctorService(+limit);
        return res.status(200).json({
            errCode: response.errCode,
            message: response.message,
            data: response.doctor,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: 500,
            message: "Error from server",
        });
    }
}

let getAllDoctor = async (req, res) => {
    try {
        let response = await doctorService.getAllDoctorService();
        return res.status(200).json({
            errCode: response.errCode,
            message: response.message,
            data: response.doctor,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "error from server"
        })
    }
}
let createPageDoctor = async (req, res) => {
    try {
        let data = req.body;
        if (!data || !data.htmlContent || !data.markDownContent || !data.doctorId || !data.clinicId || !data.specialtyId || !data.action) {
            return res.status(400).json({
                errCode: 400,
                message: "Input is Empty!"
            });
        } else {
            let response = await doctorService.createPageDoctorService(data);
            return res.status(200).json({
                errCode: response.errCode,
                message: response.message,
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "error from server"
        })

    }
}

let getDoctorMardown = async (req, res) => {
    try {
        let data = req.query.doctorId;
        if (data) {
            let response = await doctorService.getDoctorMardownService(data);
            return res.status(200).json({
                errCode: response.errCode,
                message: response.message,
                data: response.doctor,
            });
        } else {
            return res.status(400).json({
                errCode: 400,
                message: "Input is Empty!"
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: 500,
            message: "Error from server",
        });

    }
}

module.exports = {
    getTopDoctor: getTopDoctor,
    getAllDoctor: getAllDoctor,
    createPageDoctor: createPageDoctor,
    getDoctorMardown: getDoctorMardown,
} 