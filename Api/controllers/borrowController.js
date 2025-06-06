const { createBorrowLog } = require("../services/borrowService");

const handleBorrowBook = async (req, res) => {
	const { userId, bookId } = req.body;

	if (!userId || !bookId) {
		return res.status(400).json({ message: "User ID and Book ID are required." });
	}

	try {
		const borrowEntry = await createBorrowLog(userId, bookId);
		res
			.status(201)
			.json({ success: true, message: "Book borrowed!", data: borrowEntry });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	handleBorrowBook,
};
