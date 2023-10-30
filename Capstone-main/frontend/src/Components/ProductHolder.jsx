
import { useContext } from "react";
import "../CSS/ProductHolder.css";
import { useGetAllProductsQuery } from "../redux/ProductApi";
import Product from "./Product";
import { DataContext } from "../../Context/DataContext";


const ProductHolder = () => {  
const {data , isLoading , error} = useGetAllProductsQuery('get-product')
const {search} = useContext(DataContext)



if (isLoading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error.message}</div>;
}

const filteredProducts = data.filter((product) => {
  if (search === "") {
    
    return product;
  } else {
  
    return product.title.toLowerCase().startsWith(search.toLowerCase());
  }
});




  return (
    <div className='product-main-holder d-flex justify-content-center gap-4 mt-4'>
    
  
{filteredProducts.length > 0 ? (filteredProducts.map((data , index)=>{
      return <Product key={index} product={data}/>
    })) : (
      <div className="not-found">Searched Product does not found.</div>
    ) }

    
  
    </div>
  );
};
export default ProductHolder;
