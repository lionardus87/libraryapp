import React from "react";
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Typography,
} from "@mui/material";

// Example data (replace with API data)
const books = [
	{
		id: 1,
		title: "The Great Gatsby",
		author: "F. Scott Fitzgerald",
		pages: 180,
		description: "A novel set in the Roaring Twenties...",
		ISBN: "9780743273565",
		yearPublished: 1925,
		bookCover:
			"https://upload.wikimedia.org/wikipedia/en/f/f7/TheGreatGatsby_1925jacket.jpeg",
	},
	{
		id: 2,
		title: "To Kill a Mockingbird",
		author: "Harper Lee",
		pages: 281,
		description: "A story of racial injustice in the Deep South...",
		ISBN: "9780061120084",
		yearPublished: 1960,
		bookCover: "https://images-na.ssl-images-amazon.com/images/I/81OdwZG5cbL.jpg",
	},
];

const BooksPage = () => {
	return (
		<Container sx={{ py: 5 }}>
			<Typography variant="h4" gutterBottom align="center">
				Browse Books
			</Typography>
			<Grid container spacing={4}>
				{books.map((book) => (
					<Grid item xs={12} sm={6} md={4} key={book.id}>
						<Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
							<CardMedia
								component="img"
								image={book.bookCover}
								alt={book.title}
								height="300"
								sx={{ objectFit: "cover" }}
							/>
							<CardContent>
								<Typography variant="h6" gutterBottom>
									{book.title}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									<b>Author:</b> {book.author}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									<b>Pages:</b> {book.pages}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									<b>Year:</b> {book.yearPublished}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									<b>ISBN:</b> {book.ISBN}
								</Typography>
								<Typography variant="body2" mt={1}>
									{book.description}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default BooksPage;
