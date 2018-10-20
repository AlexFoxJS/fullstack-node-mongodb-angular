const multer = require('multer')
const moment = require('moment')

/** Место для хранения загружаеммых файлов, Формат наименования загружаеммых файлов */
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, './uploads')
	},
	filename(req, file, cb) {
		const date = moment().format('DDMMYYYY-HHmmss_SSS')
		cb(null, `${date}-${file.originalname}`)
	},
})

/** Проверка на тип загружаемого файла */
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') cb(null, true)
	else cb(null, false)
}

/** Максимальный размер загружаемой картинки */
const limits = {
	fileSize: 1920 * 1080 * 5
}

module.exports = multer({ storage, fileFilter, limits })
