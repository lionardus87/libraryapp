const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookLogSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		bookId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
			required: true,
		},
		borrowDate: {
			type: Date,
			default: Date.now,
		},
		returnDate: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("BookLog", bookLogSchema);
