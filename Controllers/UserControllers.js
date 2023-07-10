
const User = require('../Model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



/** 
 * this section for Login User with verifying if exist or not and sended data
 */
exports.Login = async (req, res) => {
    try {
        const found = await User.findOne({ Email: req.body.Email }) // find email if exist 
        console.log(found)
        if (found) {
            const passwordcheck = bcrypt.compareSync(req.body.Password, found.Password) // compare password
            if (passwordcheck) {
                const data = {
                    idClient: found._id
                }
                const token = jwt.sign(data, 'Secret', { expiresIn: '1d' }) /// generate Token 

                res.send({ message: `Bienvenue ${found.Nom} , tu es connecté. `, token }) // Connected 
            }
            else {
                res.status(400).send({ message: "Verifiez votre email or password!" }) // Invalid data 
            }
        }
        else {
            res.status(400).send({ message: "Verifiez votre email or password!" }) // Invalid Data
        }
    }
    catch (error) {
        res.status(500).send({ message: error.message || 'Error' }) // serveur error
    }
}
/** 
 * this section for register Add User with verifying if exist or not
 */
exports.Register = async (req, res) => {
    try {
        const found = await User.findOne({ Email: req.body.Email }) // verify exist of user
        if (found) {
            res.status(400).send({ message: 'Email est déja enregistré.' }) // bad request 
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            req.body.Password = bcrypt.hashSync(req.body.Password, salt);// Crypt Password before store in database 
            const resgistered = await User.create(req.body) // save user in data base
            res.send({ message: "Ajouté avec succés", resgistered }) // Response message of registration 
        }
    }
    catch (error) {
        res.status(500).send({ message: error.message || 'Error message' })
    }
}