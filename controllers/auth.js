const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async (req, res) => {
	const candidate = await User.findOne({email: req.body.email})

	if (candidate) {
		// Пользователь найден. Проверка пароля.
		const passwordResult = bcryptjs.compareSync(req.body.password, candidate.password)

		if (passwordResult) {
			// Пароли совпадают. Генерация токкена.
			const token = jwt.sign({
				email: candidate.email,
				userId: candidate._id,
			}, keys.jwt, {expiresIn: 60 * 60})

			res.status(200).json({token: `Bearer ${token}`})
		} else {
			// Неверный пароль.
			res.status(401).json({
				message: 'Неверный пароль'
			})
		}
	} else {
		// Пользователь не найден. Ошибка.
		res.status(409)
	}
}

module.exports.register = async (req, res) => {
	// email password
	const candidate = await User.findOne({email: req.body.email})

	if (candidate) {
		// Пользователь с таким "email" уже зарегестрирован
		res.status(409).json({
			message: 'Пользователь с таким "email" уже существует'
		})
	} else {
		// Регистрация нового пользователя
		const salt = bcryptjs.genSaltSync(10) // Генерируем локальный хеш
		const password = req.body.password // Берем пароль пользователся
		const user = new User({
			email: req.body.email,
			password: bcryptjs.hashSync(password, salt), // Шифруем пароль пользователя
		})

		try {
			await user.save()
			res.status(201).json(user)
		} catch (e) {
			// Ощибка при создании нового пользователя
			errorHandler(res, e)
		}
	}
}
