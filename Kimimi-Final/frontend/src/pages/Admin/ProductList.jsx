import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const productData = {
      name,
      description,
      price,
      category,
      quantity,
      brand,
      image: imageUrl,
    };

    const data = await createProduct(productData).unwrap();
    toast.success(`${data.name} is created`);
    navigate("/");
  } catch (error) {
    console.error(error);
    toast.error(error.data?.message || "Product creation failed. Try again.");
  }
};

  
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_uploads"); // Your Cloudinary upload preset

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dcfhhdtjr/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.secure_url) {
        toast.success("Image uploaded successfully!");
        setImage(file);
        setImageUrl(data.secure_url); // Store the image URL from Cloudinary
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed.");
    }
  };
  
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="flex-1">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  id="name"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex-1 ml-10">
                <label htmlFor="price">Price</label> <br />
                <input
                  type="number"
                  id="price"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="flex-1">
                <label htmlFor="quantity">Quantity</label> <br />
                <input
                  type="number"
                  id="quantity"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="flex-1 ml-10">
                <label htmlFor="brand">Brand</label> <br />
                <input
                  type="text"
                  id="brand"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between gap-10">
              <div className="flex-1">
                <label htmlFor="category">Category</label> <br />
                <select
                  id="category"
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
