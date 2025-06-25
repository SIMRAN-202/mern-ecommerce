import React, {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { useUpdateProductMutation, useDeleteProductMutation, useGetProductByIdQuery,useUploadProductImageMutation  } from '../../redux/api/productApiSlice.js'
import {useFetchCategoriesQuery} from '../../redux/api/categoryApiSlice.js'
import { useEffect } from 'react'
import AdminMenu from './AdminMenu.jsx'
import { toast } from 'react-toastify'


const ProductUpdate = () => {
    const params = useParams()

    const {data: productData} = useGetProductByIdQuery(params._id)

    const [image, setImage] = useState(productData?.image || "")
    const [name, setName] = useState(productData?.name || "")
    const [price, setPrice] = useState(productData?.price || 0)
    const [description, setDescription] = useState(productData?.description || "")
    const [category, setCategory] = useState(productData?.category || "")
    const [quantity, setQuantity] = useState(productData?.quantity || 0)
    const [brand, setBrand] = useState(productData?.brand || "")
    const [stock, setStock] = useState(productData?.countInStock)

    const navigate = useNavigate()
    const {data:categories = []}= useFetchCategoriesQuery()
    const [uploadProductImage] = useUploadProductImageMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(()=>{
        if(productData && productData._id){
            setName(productData.name)
            setPrice(productData.price)
            setDescription(productData.description)
            setCategory(productData.categories?._id)
            setQuantity(productData.quantity)
            setBrand(productData.brand)
            setImage(productData.image)
        }
    }, [productData])

    const uploadFileHandler = async (e) =>{
        const formData = new FormData()
        formData.append('image', e.target.files[0])
        try {
            const res = await uploadProductImage(formData).unwrap()
            setImage(res.image)
            toast.success("Item added successfully")
        } catch (error) {
            toast.error("Item addedd sucessfully")
        }
    }

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const formData = new FormData();
          formData.append("image", image);
          formData.append("name", name);
          formData.append("description", description);
          formData.append("price", price);
          formData.append("category", category);
          formData.append("quantity", quantity);
          formData.append("brand", brand);
          formData.append("countInStock", stock);
    
          const { data } = await updateProduct({productId : params._id, formData});
    
          if (data?.error) {
            toast.error(data.error);
          } else {
            toast.success("Product successfully updated");
            navigate("/admin/allproductslist");
          }
        } catch (error) {
          console.error(error);
          toast.error("Product update failed. Try Again.");
        }
      };

      const handleDelete = async (e) =>{
        try {
            let answer = window.confirm("Are you sure you want to delete?")

            if (!answer){
                return 
            }
            const {data} = await deleteProduct(params._id)
            toast.success("Product deleted successfully")
            navigate("/admin/allproductslist")
        } catch (error) {
            toast.error("Delete failed!")
        }
      }

  return (
    <div className='container xl:mx-[9rem] sm:mx-0'>
          <div className='flex flex-col md:flex-row'>
            <AdminMenu />
            <div className='md:w-3/4 p-3'>
              <h2 className='text-2xl font-bold mb-4'>Create Product</h2>
    
              {image && (
                <div className='text-center'>
                  <img
                    src={image}
                    alt='product'
                    className='block mx-auto max-h-[200px]'
                  />
                </div>
              )}
    
              <div className='mb-3'>
                <label className='border px-4 block w-full text-center py-11 cursor-pointer'>
                  {image ? image.name : 'Upload Image'}
                  <input
                    type='file'
                    name='image'
                    accept='image/*'
                    onChange={uploadFileHandler}
                    className='hidden'
                  />
                </label>
              </div>
    
              <form  className='p-3'>
                <div className='flex flex-wrap'>
                  <div>
                    <label htmlFor='name'>Name</label> <br />
                    <input
                      type='text'
                      className='p-4 mb-3 w-[30rem] border'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className='ml-10'>
                    <label htmlFor='price'>Price</label> <br />
                    <input
                      type='number'
                      className='p-4 mb-3 w-[30rem] border'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
    
                <div className='flex flex-wrap'>
                  <div>
                    <label htmlFor='quantity'>Quantity</label> <br />
                    <input
                      type='number'
                      className='p-4 mb-3 w-[30rem] border'
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className='ml-10'>
                    <label htmlFor='brand'>Brand</label> <br />
                    <input
                      type='text'
                      className='p-4 mb-3 w-[30rem] border'
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                </div>
    
                <label htmlFor='description' className='my-5'>
                  Description
                </label>
                <textarea
                  className='p-2 mb-3 border w-[95%]'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
    
                <div className='flex justify-between'>
                  <div>
                    <label htmlFor='stock'>Count in Stock</label> <br />
                    <input
                      type='number'
                      className='p-4 mb-3 w-[30rem] border'
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
    
                  <div>
                    <label htmlFor='category'>Category</label> <br />
                    <select
                      className='p-4 mb-3 w-[30rem] border'
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value=''>Select Category</option>
                      {categories?.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
             <div>
                <button
                  onClick={handleSubmit}
                  className='py-4 px-10 text-lg border hover:bg-gray-100 transition mr-6'
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className='py-4 px-10 text-lg border hover:bg-gray-100 transition'
                >
                 Delete
                </button>
            </div>
              </form>
            </div>
          </div>
        </div>
  )
}

export default ProductUpdate