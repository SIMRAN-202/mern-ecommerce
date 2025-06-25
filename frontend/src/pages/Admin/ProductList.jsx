import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCreateProductMutation,
  useUploadProductImageMutation
} from '../../redux/api/productApiSlice.js';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice.js';
import { toast } from 'react-toastify';
import AdminMenu from './AdminMenu.jsx';

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data?.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className='container xl:mx-[9rem] sm:mx-0'>
      <div className='flex flex-col md:flex-row'>
        <AdminMenu />
        <div className='md:w-3/4 p-3'>
          <h2 className='text-2xl font-bold mb-4'>Create Product</h2>

          {imageUrl && (
            <div className='text-center'>
              <img
                src={imageUrl}
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

          <form onSubmit={handleSubmit} className='p-3'>
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

            <button
              type='submit'
              className='py-4 px-10 text-lg border hover:bg-gray-100 transition'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
