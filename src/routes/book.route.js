const express = require('express');
const router = express();
const Book = require('../models/book.model');



// here we will create a our own middleware

const getBook = async(req,res,next)=>{
        
    let book;
    const {id}= req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({message:"the id does not valid"})
    }

    try {
        book = await Book.findById(id);

        if(!book){
            return res.status(404).json({message:"the id is undefined"})
        }
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }
    res.book = book;
    next()

}
//code to get all books

 router.get('/', async(req,res)=>{
      
   try {
      const books = await Book.find()
      if(books.length===0){
        return res.status(204).json([]);
      }
      res.status(201).json(books);

   } catch (error) {
       
       res.status(500).json({message:error.message});
    
   }


 })
 //code to find only one book by id

 router.get ('/:id', getBook, async(req,res)=>{
      res.json(res.book)
 })

//code to change the entire model
 router.put ('/:id', getBook, async(req,res)=>{
   try {
    const book = res.book;
    book.name_book= req?.body.name_book || book.name_book
    book.name_author= req?.body.name_author || book.name_author
    book.genred = req?.body.genred || book.genred
    book.date_publication = req?.body.date_publication || book.date_publication
    
    const changedBook = await book.save();
    res.json(changedBook);
  
    
   } catch (error) {
   res.status(400).json({message:error.message})   
   }
})

//code to change something from our model


router.patch('/:id', getBook, async(req,res)=>{
    if(!req.body.name_book && !req.body.name_author && !req.body.genred && !req.body.date_publication){
        return res.status(400).json({message:"send even one piece of information"})
    }
    try {
        const book = res.book;
        book.name_book = req.body.name_book || book.name_book
        book.name_author = req.body.name_author || book.name_author
        book.genred=req.body.genred || book.genred
        book.date_publication = req.body.date_publication||book.date_publication
    
        const changeBook = await book.save()
        res.json(changeBook);
    } catch (error) {
        res.status(400).json({message:error.message});
    }



})

//code to delete the model specifically by id

router.delete('/:id', getBook, async(req,res)=>{
    try {
        const book = res.book;
        await book.deleteOne(
       {
        _id:book.id,
       }
        )
        res.json({message:`the book ${book.name_book} was deleted`})
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
     
      
})


// code to create a new book
  router.post('/',async(req,res)=>{
      const {name_book,name_author,genred,date_publication} = req?.body;
      if(!name_book || !name_author || !genred || !date_publication){
         return res.status(400).json({message:'all data is required'})
      }
      const book = new Book({
        name_book,
        name_author,
        genred,
        date_publication
      })
   try {
       
    const newBook = await book.save();
    res.status(201).json(newBook);
   } catch (error) {
     res.status(400).json({message:error.message});
    
   }
  })

  
 module.exports = router