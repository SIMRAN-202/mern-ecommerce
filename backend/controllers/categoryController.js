import Category from '../models/categoryModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return res.status(400).json({ error: "Category already exists" });
  }

  try {
    const category = await new Category({ name }).save();
    res.json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const updateCategory = asyncHandler(async (req,res) =>{
    try {
        const {name} = req.body;
        const {categoryId} = req.params;
        const category = await Category.findOne({_id:categoryId});

        if(!category){
            return res.status(404).json({error:"Category not found"})
        }
        category.name = name
        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const removed = await Category.findByIdAndDelete(req.params.categoryId);

    if (!removed) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully", removed });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const listCategory = asyncHandler(async(req,res)=>{
    try {
        const all = await Category.find({})
        res.json(all)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

const readCategory = asyncHandler(async(req,res)=>{
    try {
        const category = await Category.findOne({_id:req.params.id})
        res.json(category);
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})


export {createCategory, updateCategory, deleteCategory, listCategory, readCategory}