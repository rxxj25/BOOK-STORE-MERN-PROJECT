  // METHOD 1
  /*import express from "express";
import {PORT,mongoDBURL}  from "./config.js";
import mongoose from "mongoose";
import {Book} from './models/bookmodel.js';

const app= express();

app.use(express.json());

app.get('/',(request,response) =>{
console.log(request)
return response.status(235).send('Welcome to Mern')
});

app.post('/books',async(request,response)=>{
try{
    if(
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
    ){
        return response.status(400).send({
            message:'Send all required fields:tile,author,publishYear',
        });
    }
    const newBook ={
        title:request.body.title,
        author:request.body.author,
        publishYear:request.body.publishYear,

    };

const book =await Book.create(newBook);
return response.status(201).send(book);
}

catch (error){
console.log(error.message);
response.status(500).send({message:error.message});
}

});

app.get('/books',async(request,response)=>{
try{
    const books =await Book.find({});


    return response.status(200).json({
        count:books.length,
        data:books
    }); 
} catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message});
}



});

//Route to get data from data base

app.get('/books/:id',async(request,response)=>{
    try{

        const {id} = request.params;

        const book =await Book.findById(id );
    
        
        return response.status(200).json(book); 
    } catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
    
    
    
    })

    //Route to update book
    app.put('/books/:id',async(request,response)=>{
        try {
            if(
                !request.body.title ||
                !request.body.author ||
                !request.body.publishYear ||

            )
            {
                return response.status(400).send({
                    message:'Send all required fields:title,author,publishYear',
                });
            }
            const {id} = request.params;

            const result = await Book.findByIdAndUpdate(id,request.body);


        if(!result){
            return response.status(404).json({message:'Book not found'});

        }
        return response.status(200).json({message:'Book updated succesfully'});
        }catch(error){
            console.log(error.message);
            response.status(500).send({message:error.message});
        }
    });

mongoose
.connect(mongoDBURL)
.then(()=>{
console.log('App connected to database');
app.listen(PORT,()=>{
    console.log('App is listening to port: ${PORT}');
});

})
.catch((error) =>{
    console.log(error);
});

*/


// METHOD 2

import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookmodel.js';
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

// Middleware to parse JSON body
app.use(express.json());

//Middleware for handling CORS in policy
//option1: Allow all origins with default cors

app.use(cors()); 

//option2: Allow Custom Origins
// app.use(
 //    cors({
 //        origin:'',
 //        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
  //   })
// );

// Welcome route
app.get('/', (request, response) => {
    console.log(request);
    return response.status(235).send('Welcome to Mern');
});

app.use('/books',booksRoute);

// POST route to create a new book
app.post('/books', async (request, response) => {
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
 app.get('/books', async (request, response) => {
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

/*app.get('/books',async(request,response)=>{
    try{
        const books=await Book.find({});;

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }

});
 */





// GET route to fetch a specific book by its ID
app.get('/books/:id', async (request, response) => {
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
app.put('/books/:id', async (request, response) => {
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
app.delete('/books/:id', async (request, response) => {

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





mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });




