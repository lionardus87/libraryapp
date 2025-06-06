const { createBorrowLogs } = require("../services/borrowService");
const { findUser } = require("../services/userService");
const BorrowLog = require("../model/BookLog");
const User = require("../model/User");
const Book = require("../model/Book");

const handleBorrowBooks = async (req, res) => {
	const { username, books } = req.body;

	if (!username || !books || !Array.isArray(books) || books.length === 0) {
		return res.status(400).json({ message: "Username and books are required." });
	}

	try {
		const user = await findUser({ username });
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		const borrowLogs = await createBorrowLogs(user._id, books);
		return res
			.status(201)
			.json({ message: "Books borrowed successfully.", borrowLogs });
	} catch (err) {
		console.error("Borrow error:", err);
		res.status(400).json({ message: err.message || "Borrowing failed." });
	}
};

const getUserBorrowLogs = async (req, res) => {
	const { username } = req.params;

	try {
		const user = await findUser({ username });
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		const logs = await BorrowLog.find({ userId: user._id }).populate("bookId");
		const formatted = logs.map((log) => ({
			title: log.bookId.title,
			borrowedDate: log.borrowDate.toISOString().slice(0, 10),
			returnDate: log.returnDate.toISOString().slice(0, 10),
		}));

		res.json(formatted);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ message: err.message || "Failed to fetch borrow logs." });
	}
};

const getAllBorrowLogs = async (req, res) => {
	try {
		const users = await User.find();
		const result = [];

		for (const user of users) {
			const logs = await BorrowLog.find({ userId: user._id }).populate("bookId");
			const books = logs.map((log) => ({
				id: log.bookId._id,
				title: log.bookId.title,
				borrowedDate: log.borrowDate.toISOString().slice(0, 10),
				returnDate: log.returnDate.toISOString().slice(0, 10),
			}));

			if (books.length > 0) {
				result.push({
					memberId: user._id,
					name: user.username,
					books,
				});
			}
		}

		res.json(result);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ message: err.message || "Failed to fetch borrow logs." });
	}
};

const returnBorrowedBook = async (req, res) => {
	const { userId, bookId } = req.body;

	if (!userId || !bookId) {
		return res.status(400).json({ message: "User ID and Book ID are required." });
	}

	try {
		const log = await BorrowLog.findOne({ userId, bookId });
		if (!log) {
			return res.status(404).json({ message: "Borrow record not found." });
		}

		// Delete borrow log
		await BorrowLog.deleteOne({ _id: log._id });

		// Mark book as available
		const book = await Book.findById(bookId);
		if (book) {
			book.available = true;
			await book.save();
		}

		res.json({ message: "Book returned successfully." });
	} catch (err) {
		console.error("Return error:", err);
		res.status(500).json({ message: err.message || "Failed to return book." });
	}
};

module.exports = {
	handleBorrowBooks,
	getUserBorrowLogs,
	getAllBorrowLogs,
	returnBorrowedBook,
};
