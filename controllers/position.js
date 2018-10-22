const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

/** */
module.exports.getByCategoryId = async (req, res) => {
	try {
		const positions = await Position.find({
			categoryId: req.params.category,
			userId: req.user.id, // ../middleware/passport - if (user) done(null, user)
		})
		res.status(200).json(positions)
	} catch (e) {
		errorHandler(res, e)
	}
}

/** */
module.exports.create = async (req, res) => {
	try {
		const positions = await new Position({
			name: req.body.name,
			cost: req.body.cost,
			categoryId: req.body.category,
			userId: req.user.id,
		}).save()
		res.status(200).json(positions)
	} catch (e) {
		errorHandler(res, e)
	}
}

/** */
module.exports.remove = async (req, res) => {
	try {
		await Position.remove({_id: req.body.id})
		res.status(200).json({
			message: 'Позиция успешно удалена.',
		})
	} catch (e) {
		errorHandler(res, e)
	}
}

/** */
module.exports.update = async (req, res) => {
	try {
		const positions = await Position.remove(
			{_id: req.params.id}, // Находим объект в базе
			{$set: req.body}, // Меняем данные найденого объекта
			{new: true}, // Перезаписываем объект в базе
		)
		res.status(200).json(positions)
	} catch (e) {
		errorHandler(res, e)
	}
}
