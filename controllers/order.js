const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

// GET localhost:5000/api/order?offset=2&limit=5
module.exports.getAll = async (req, res) => {
	const query = {
		userId: req.user.id,
	}

	// Дата старта
	if (req.query.start) {
		query.date = {
			// Больше или равно
			$gte: req.query.start
		}
	}

	// Дата конца
	if (req.query.end) {
		if (!query.date) {
			query.date = {}
		}
		query.date = {
			// Меньше или равно
			$lte: req.query.end
		}
	}

	//
	if (req.query.order) {
		query.order = +req.query.order
	}

	try {
		const orders = await Order
			.find(query)
			.sort({data: -1})
			.skip(+req.query.offset)
			.limit(+req.query.limit)

		res.status(200).json(orders)
	} catch (e) {
		errorHandler(e)
	}
}

module.exports.create = async (req, res) => {
	try {
		const lastOrder = await Order.findOne({userId: req.user.id}).sort({date: -1})
		const maxOrder = lastOrder ? lastOrder.order : 0
		const order = await new Order({
			list: req.body.list,
			userId: req.user.id,
			order: maxOrder + 1,
		}).save()

		res.status(201).json(order)
	} catch (e) {
		errorHandler(res, e)
	}
}
