import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import { useAllProductsQuery } from '../../redux/api/productApiSlice.js'
// import AdminMenu from './AdminMenu'
import Loader from '../../components/Loader'
import AdminMenu from './AdminMenu'

const AllProducts = () => {
    const {data:products, isLoading, isError} = useAllProductsQuery()
    if(isLoading){
        return <Loader />
    }

    if (isError){
        return <div>Error Loading Products</div>
    }
  return (
    <div className='conatiner mx-[10rem]'>
        <div className="flex flex-col md:flex-row">
            <div className="p-3">
                <div className="ml-[2rem] text-xl font-bold h-12">
                    All Products ({products.length})
                </div>

                <div className="flex flex-wrap justify-around items-center">
                    {products.map((product) => (
                        <Link key={product._id} to={`/admin/product/update/${product._id}`} className='block mb-4 overflow-hidden'>
                            <div className="flex">
                            <img src={product.image} alt={product.name} className='w-[10rem] object-cover' />

                            <div className="p-4 flex-flex-col justify-around">
                                <div className="flex justify-between">
                                    <h5 className="text-xl font-semibold mb-2">
                                        {product.name}
                                    </h5>

                                    <p className="text-gray-400 text-sm">
                                        {moment(product.createAt).format("MMMM Do YYYY")}
                                    </p>
                                </div>
                                <p className="text-gray-400 xl:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                                    {product?.description?.substring(0,60)}...
                                </p>

                                <div className="flex justify-between">
                                    <Link to={`/admin/product/update/${product._id}`} className='inline-flex items-center px-3 py-2 text-sm font-medium text-center'>Updata Product</Link>
                                </div>
                            </div>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>

            <div className="md:w-1/4 p-3 mt-2">
            <AdminMenu />
            </div>
        </div>
    </div>
  )
}

export default AllProducts