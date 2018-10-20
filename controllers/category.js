const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

/** */
module.exports.getAll = async (req, res) => {
	try {
		const category = await Category.find({userId: req.user.id})
		res.status(200).json(category)
	} catch (e) {
		errorHandler(e)
	}
}

/** */
module.exports.getById = async (req, res) => {
	try {
		const category = await Category.findById(req.params.id)
		res.status(200).json(category)
	} catch (e) {
		errorHandler(e)
	}
}

/** */
module.exports.remove = async (req, res) => {
	try {
		await Category.remove({_id: req.params.id})
		await Position.remove({categoryId: req.params.id})
		res.status(200).json({
			message: 'Категория успешно удалена.'
		})
	} catch (e) {
		errorHandler(e)
	}
}

/** */
module.exports.create = async (req, res) => {
	const category = new Category({
		name: req.body.name,
		userId: req.user.id,
		imageURL: req.file ? req.file.path : "",
	})

	try {
		await category.save()
		res.status(201).json(category)
	} catch (e) {
		errorHandler(e)
	}
}

/** */
module.exports.update = async (req, res) => {
	try {
		const category = await Category.findByIdAndUpdate(
			{_id: req.params.id},
			{...req.body, imageURL: req.file ? req.file.path : ''},
			{new: true},
		)
		console.log([req])
		res.status(200).json(category)
	} catch (e) {
		errorHandler(e)
	}
}
