import allCodeService from "../services/allCodeService";
let getAllCode = async (req, res) => {
    try {
        let type = req.query.type;
        if (type) {
            let respone = await allCodeService.getAllCodeService(type);
            return res.status(200).json({
                errCode: respone.errCode,
                message: respone.message,
                allCode: respone.allCode,
            })
        } else {
            return res.status(200).json({
                errCode: 2,
                message: "Type is null",
            })
        }

    } catch (e) {
        console.log("Error code getAllCode Servive: ", e);
        return res.status(200).json({
            errCode: 1,
            message: "Error code getAllCode Servive",
        })
    }
}

module.exports = {
    getAllCode: getAllCode,
}