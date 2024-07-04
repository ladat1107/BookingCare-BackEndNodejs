import bookingService from "../services/bookingService";
import emailService from "../services/emailService";

let createAppointmentForUser = async (req, res) => {
    try {
        let dataInput = req.body;
        if (dataInput && dataInput.doctorId && dataInput.timeType && dataInput.date && dataInput.email) {
            let response = await emailService.sendEmailConform(dataInput);
            //let response = await bookingService.createAppointmentService(dataInput);
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
        console.log(error)
        return res.status(500).json({
            errCode: 500,
            message: "error from server"
        })
    }
}
let confirmSchedule = async (req, res) => {
    try {
        let data = req.body;
        if (data.token && data.doctorId) {
            let response = await bookingService.confirmScheduleService(data);
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
        console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "error from server"
        })
    }
}
module.exports = {
    createAppointmentForUser: createAppointmentForUser,
    confirmSchedule: confirmSchedule,
}