import React, { useState } from 'react'
import { useCreateCategoryMutation, useDeleteCategoryMutation, useFetchCategoriesQuery, useUpdateCategoryMutation } from '../../redux/api/categoryApiSlice'
import CategoryForm from '../../components/CategoryForm'
import { toast } from 'react-toastify'
import Modal from '../../components/Modal'


const CategoryList = () => {
    const {data:categories} = useFetchCategoriesQuery()
    const [name, setName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updatingName, setUpdatingName] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

    const handleCreateCategory = async (e) =>{
        e.preventDefault()
        if (!name){
            toast.error("Category name is required")
            return
        }

        try {
            const result = await createCategory({name}).unwrap()
            if(result.error){
                toast.error(result.error.message)
            }else{
                setName("")
                toast.success(`${result.name} created successfully`)
            }
        } catch (error) {
            toast.error('Creating category failed!')
        }
    }

    const handleUpdateCategory = async (e)=>{
        e.preventDefault()

        if(!updatingName){
            toast.error("Category name is required")
            return;
        }

        try {
            const result = await updateCategory({
            categoryId: selectedCategory._id,
            name: updatingName
            }).unwrap();
            if(result.error){
                toast.error(result.error.message)
            }else{
                setUpdatingName("")
                setSelectedCategory(null)
                setModalVisible(false)
                toast.success(`${result.name} updated successfully`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteCategory = async (e) =>{
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap()
            if(result.error){
                toast.error(result.error.message)
                }else{
                    setSelectedCategory(null)
                    setModalVisible(false)
                    toast.success(`${result?.name || 'Category'} deleted successfully`);
                    }
        } catch (error) {
            console.log(error)
            toast.error("Try again")
        }
    }

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row  min-h-screen">
  <div className="md:w-3/4 p-6">
    <h1 className="text-4xl font-bold text-[#8d6e63] mb-6"> Manage Categories</h1>

    <CategoryForm 
      value={name} 
      setValue={setName} 
      handleSubmit={handleCreateCategory} 
    />

    <hr className="my-6 border-[#C69C6D]" />

    <div className="flex flex-wrap gap-3">
      {categories?.map((category) => (
        <div key={category._id}>
          <button 
            className="bg-[#8d6e63] text-white px-6 py-2 rounded-full text-sm hover:bg-[#efebe9] hover:text-[#8d6e63] transition-colors"
            onClick={() => {
              setModalVisible(true);
              setSelectedCategory(category);
              setUpdatingName(category.name);
            }}
          >
            {category.name}
          </button>
        </div>
      ))}
    </div>

    <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
      <CategoryForm 
        value={updatingName} 
        setValue={val => setUpdatingName(val)}
        handleSubmit={handleUpdateCategory}
        buttonText="Update"
        handleDelete={handleDeleteCategory}
      />
    </Modal>
  </div>
</div>

  )
}

export default CategoryList