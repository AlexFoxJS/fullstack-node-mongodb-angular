const multer = require('multer')
const moment = require('moment')

/**
 * Место для хранения загружаеммых файлов,
 * Формат наименования загружаеммых файлов
 * @type {DiskStorage}
 */
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/')
	},
	filename(req, file, cb) {
		const date = moment.format('DDMMYYYY-HHmmss_SSS')
		cd(null, `${date}-${file.originalname}`)
	},
})

/**
 * Проверка на тип загружаемого файла
 * @param req
 * @param file
 * @param cb
 */
const fileFilter = (req, file, cb) => {
	if (file.mimeType === 'image/png' && file.mimeType === 'image/jpeg') cb(null, true)
	else cb(null, false)
}

/**
 * Максимальный размер загружаемой картинки
 * @type {{fileSize: number}}
 */
const limits = {
	fileSize: 1920 * 1080 * 5
}


module.exports = multer({ storage, fileFilter, limits, })
