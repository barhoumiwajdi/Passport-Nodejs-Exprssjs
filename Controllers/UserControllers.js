
const User = require('../Model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.Login = async (req, res) => {
    try {
        const found = await User.findOne({ Email: req.body.Email })
        console.log(found)
        if (found) {
            const passwordcheck = await bcrypt.compareSync(req.body.Password, found.Password)
            if (passwordcheck) {
                const data = {
                    idClient: found._id
                }
                const token = jwt.sign(data, 'Secret', { expiresIn: '1d' })

                res.send({ message: `Bienvenue ${found.Nom} , tu es connecté. `, token })
            }
            else {
                res.status(400).send({ message: "Verifiez votre email or password!" })
            }
        }
        else {
            res.status(400).send({ message: "Verifiez votre email or password!" })
        }
    }
    catch (error) {
        res.status(500).send({ message: error.message || 'Error' })
    }
}

exports.Register = async (req, res) => {
    try {
        const found = await User.findOne({ Email: req.body.Email })
        if (found) {
            res.status(400).send({ message: 'Email est déja enregistré.' })
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            req.body.Password = bcrypt.hashSync(req.body.Password, salt);
            const resgistered = await User.create(req.body)
            res.send({ message: "Ajouté avec succés", resgistered })
        }
    }
    catch (error) {
        res.status(500).send({ message: error.message || 'Error message' })
    }
}