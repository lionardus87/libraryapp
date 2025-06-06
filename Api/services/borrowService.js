const BorrowLog = require("../model/BookLog");
const Book = require("../model/Book");

const createBorrowLog = async (userId, bookId) => {
	const borrowDate = new Date();
	const returnDate = new Date(borrowDate);
	returnDate.setDate(borrowDate.getDate() + 30); // +30 days

	const borrowLog = new BorrowLog({
		userId,
		bookId,
		borrowDate,
		returnDate,
	});

	// Update book availability
	await Book.findByIdAndUpdate(bookId, { available: false });

	return await borrowLog.save();
};

const getUserBorrowLogs = async (userId) => {
	return await BorrowLog.find({ userId }).populate("bookId").exec();
};

module.exports = {
	createBorrowLog,
	getUserBorrowLogs,
};
