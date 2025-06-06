const BorrowLog = require("../model/BookLog");
const Book = require("../model/Book");

const createBorrowLogs = async (userId, books) => {
	const logs = [];

	for (const book of books) {
		const bookRecord = await Book.findById(book._id);

		if (!bookRecord) throw new Error(`Book with ID ${book._id} not found.`);
		if (!bookRecord.available)
			throw new Error(`Book "${bookRecord.title}" is already borrowed.`);

		// Mark book unavailable
		bookRecord.available = false;
		await bookRecord.save();

		// Create BorrowLog
		const borrowDate = new Date();
		const returnDate = new Date(borrowDate);
		returnDate.setDate(borrowDate.getDate() + 30);

		const log = new BorrowLog({
			userId,
			bookId: bookRecord._id,
			borrowDate,
			returnDate,
		});

		await log.save();
		logs.push(log);
	}

	return logs;
};

module.exports = {
	createBorrowLogs,
};
