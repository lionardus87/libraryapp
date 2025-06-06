const BorrowLog = require("../model/BookLog");

const findBorrowLog = async (filter) => {
	return await BorrowLog.findOne(filter).exec();
};

const getAllBorrowLogsFromDB = async () => {
	return await BorrowLog.find().populate("bookId").exec();
};

const getUserBorrowLogsFromDB = async (userId) => {
	return await BorrowLog.find({ userId }).populate("bookId").exec();
};

const saveBorrowLog = async (logData) => {
	const log = new BorrowLog(logData);
	return await log.save();
};

const deleteBorrowLogById = async (id) => {
	return await BorrowLog.findByIdAndDelete(id).exec();
};

module.exports = {
	findBorrowLog,
	getAllBorrowLogsFromDB,
	getUserBorrowLogsFromDB,
	saveBorrowLog,
	deleteBorrowLogById,
};
