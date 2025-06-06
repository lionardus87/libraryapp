const { findUser } = require("../services/userService");
const {
	findBorrowLog,
	getAllBorrowLogsFromDB,
	getUserBorrowLogsFromDB,
	saveBorrowLog,
	deleteBorrowLogById,
} = require("../services/borrowService");

const Book = require("../model/Book");
const User = require("../model/User");

// -------------------- BORROW BOOK --------------------
const handleBorrowBooks = async (req, res) => {
	const { username, books } = req.body;

	if (!username || !Array.isArray(books) || books.length === 0) {
		return res.status(400).json({ message: "Username and books are required." });
	}

	try {
		const user = await findUser({ username });
		if (!user) return res.status(404).json({ message: "User not found." });

		const borrowDate = new Date();
		const returnDate = new Date(borrowDate);
		returnDate.setDate(borrowDate.getDate() + 30);

		const borrowLogs = [];

		for (const book of books) {
			const bookRecord = await Book.findById(book._id);

			if (!bookRecord) throw new Error(`Book with ID ${book._id} not found.`);
			if (!bookRecord.available)
				throw new Error(`Book "${bookRecord.title}" is already borrowed.`);

			// Mark book unavailable
			bookRecord.available = false;
			await bookRecord.save();

			// Save borrow log
			const log = await saveBorrowLog({
				userId: user._id,
				bookId: bookRecord._id,
				borrowDate,
				returnDate,
			});

			borrowLogs.push(log);
		}

		res.status(201).json({ message: "Books borrowed successfully.", borrowLogs });
	} catch (err) {
		console.error("Borrow error:", err);
		res.status(400).json({ message: err.message || "Borrowing failed." });
	}
};

// -------------------- RETURN BOOK --------------------
const returnBorrowedBook = async (req, res) => {
	const { userId, bookId } = req.body;

	if (!userId || !bookId) {
		return res.status(400).json({ message: "User ID and Book ID are required." });
	}

	try {
		const log = await findBorrowLog({ userId, bookId });
		if (!log) {
			return res.status(404).json({ message: "Borrow record not found." });
		}

		await deleteBorrowLogById(log._id);

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

// -------------------- GET ALL BORROW LOGS --------------------
const getAllBorrowLogs = async (req, res) => {
	try {
		const logs = await getAllBorrowLogsFromDB(); // Use the service function
		const userMap = new Map();

		logs.forEach((log) => {
			const userId = log.userId.toString();
			if (!userMap.has(userId)) {
				userMap.set(userId, {
					memberId: userId,
					name: "", // to be filled
					books: [],
				});
			}

			userMap.get(userId).books.push({
				id: log.bookId._id,
				title: log.bookId.title,
				borrowedDate: log.borrowDate.toISOString().slice(0, 10),
				returnDate: log.returnDate.toISOString().slice(0, 10),
			});
		});

		// Fetch usernames in batch
		const userIds = Array.from(userMap.keys());
		const users = await User.find({ _id: { $in: userIds } });

		users.forEach((user) => {
			const entry = userMap.get(user._id.toString());
			if (entry) entry.name = user.username;
		});

		res.json(Array.from(userMap.values()));
	} catch (err) {
		console.error("Get logs error:", err);
		res
			.status(500)
			.json({ message: err.message || "Failed to fetch borrow logs." });
	}
};

// -------------------- GET USER BORROW LOGS --------------------
const getUserBorrowLogs = async (req, res) => {
	const { username } = req.params;

	try {
		const user = await findUser({ username });
		if (!user) return res.status(404).json({ message: "User not found." });

		const logs = await getUserBorrowLogsFromDB(user._id);
		const formatted = logs.map((log) => ({
			title: log.bookId.title,
			borrowedDate: log.borrowDate.toISOString().slice(0, 10),
			returnDate: log.returnDate.toISOString().slice(0, 10),
		}));

		res.json(formatted);
	} catch (err) {
		console.error("User log error:", err);
		res
			.status(500)
			.json({ message: err.message || "Failed to fetch borrow logs." });
	}
};

module.exports = {
	handleBorrowBooks,
	getUserBorrowLogs,
	getAllBorrowLogs,
	returnBorrowedBook,
};
