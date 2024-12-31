import express from 'express';
import { Book } from '../models/bookmodel.js';


const router=express.Router();



router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// GET route to fetch all books
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// GET route to fetch a specific book by its ID
router.get('/', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);

        if (!book) {
            return response.status(404).send({ message: "Book not found" });
        }

        return response.status(200).json(book); // Return the book as JSON
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// PUT route to update a book
router.put('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const { id } = request.params;

        // Update the book and return the updated document
        const updatedBook = await Book.findByIdAndUpdate(id, request.body, { new: true });

        if (!updatedBook) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).json({
            message: 'Book updated successfully',
            data: updatedBook
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Connect to MongoDB and start the server


// ROUTE TO DELETE
router.delete('/', async (request, response) => {

    try{
        const {id} =request.params;

        const result=await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(400).json({message: "Book not found"});
        }
        return response.status(200).json({message:"Book deleted successfully"});

    }catch(error){
        console.log(error.message);
         response.status(500).send({message:error.message});
    }



});
export default router;