import loginService from "../services/loginService"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Input is Empty!"
        });
    }
    else {
        let userData = await loginService.handleLoginService(email, password);
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.message,
            user: userData.user ? userData.user : {},
        });
    }

}

let getUser = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let userData = await loginService.getUser(id);
        if (userData) {
            return res.status(200).json({
                errCode: userData.errCode,
                message: userData.message,
                user: userData.user,
            })
        } else {
            return res.status(200).json({
                errCode: 2,
                message: "User is not defaul",
            })
        }
    }
    else {
        return res.status(500).json({
            errCode: 1,
            message: "id null",
        })
    }
}

let handleCreateUser = async (req, res) => {
    let data = req.body;
    let response = await loginService.createUser(data);
    return res.status(200).json({
        errCode: response.errCode,
        message: response.message,
    });
}

let handleDeleteUser = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let response = await loginService.deteleUser(id);
        return res.status(200).json({
            errCode: response.errCode,
            message: response.message,
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            message: "ID is Empty"
        })
    }
}
let hanldeUpdateUser = async (req, res) => {
    let data = req.body;
    let response = await loginService.putUpdateUser(data);
    return res.status(200).json({
        errCode: response.errCode,
        message: response.message,
    })
}
module.exports = {
    handleLogin: handleLogin,
    getUser: getUser,
    handleCreateUser: handleCreateUser,
    handleDeleteUser: handleDeleteUser,
    hanldeUpdateUser: hanldeUpdateUser,
}