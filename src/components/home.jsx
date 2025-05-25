import React, {useEffect} from "react"; 
import MetaData from "./layout/metaData";
import { useGetProductsQuery } from "../redux/API/productsApi"; // Removed `productApi`
import ProductItems from "./product/productItems,"; // Fixed the import
import Loader from "./layout/loader";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "./layout/Filters";

const Home = () => {
let [searchParams] = useSearchParams();
const page = searchParams.get("page") || 1;
const keyword = searchParams.get("keyword") || "";
const min = searchParams.get("min")
const max= searchParams.get("max")
const categories= searchParams.get("categories")
const ratings= searchParams.get("ratings")






const params= {page, keyword};

min !== null && (params.min = min);
max !== null && (params.max = max);
categories !== null && (params.categories = categories);
ratings !== null && (params.ratings = ratings);




const { data, isLoading, error, isError } = useGetProductsQuery(params);

useEffect(() => {
if(isError) {
toast.error(error?.data?.message);
}
  }, [isError] );

  const columnSize = keyword ? 4 :3;

  if (isLoading) return <Loader />;
 
  return (
    <>
      <MetaData title={"Buy best products online"} />
      <div className="row">
      {keyword && (
       <div className="col-6 col-md-3 mt-5"> 
       <Filters />
       </div>
      )}
        <div className={keyword?  "col-6 col-md-9" : "col-6 col-md-12"}>
          <h1 id="products_heading" className="text-secondary">{keyword ? `${data?.products?.length} Products found with this keyword: ${keyword}` :"Latest Products"}</h1>

          <section id="products" className="mt-5">
            <div className="row">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                data?.products?.map((product) => (
                  <ProductItems key={product._id} product={product} columnSize ={columnSize} /> // Ensure unique keys
                ))
              )}
            </div>
          </section>
           
          <CustomPagination
           resPerPage= {data?.resPerPage}
           filteredProductsCount={data?.filteredProductsCount} />
        </div>
      </div>
    </>
  );
};

export default Home;
