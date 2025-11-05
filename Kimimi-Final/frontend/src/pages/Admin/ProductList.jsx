import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  // Product form states
  const [images, setImages] = useState([]); // multiple images
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");

  const navigate = useNavigate();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  // 🧩 Handle multiple file uploads to Cloudinary
  const uploadFileHandler = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const uploaders = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_uploads"); // change if needed

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dcfhhdtjr/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();

        if (data.secure_url) {
          return data.secure_url;
        } else {
          toast.error("Image upload failed for one file.");
          return null;
        }
      } catch (error) {
        console.error(error);
        toast.error("Image upload failed.");
        return null;
      }
    });

    const uploadedUrls = await Promise.all(uploaders);
    const validUrls = uploadedUrls.filter((url) => url !== null);

    if (validUrls.length > 0) {
      setImages((prev) => [...prev, ...validUrls]);
      toast.success(`${validUrls.length} image(s) uploaded successfully!`);
    }
  };

  // 🧾 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    try {
      const productData = {
        name,
        description,
        price,
        category,
        quantity,
        brand,
        image: images[0], // main image (for thumbnail use)
        images, // all uploaded images
      };

      const data = await createProduct(productData).unwrap();
      toast.success(`${data.name} created successfully!`);
      navigate("/admin/allproductslist");
    } catch (error) {
      console.error(error);
      toast.error(error.data?.message || "Product creation failed. Try again.");
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Create Product
          </h2>

          {/* 🖼️ Image preview gallery */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`uploaded-${index}`}
                    className="w-32 h-32 object-cover rounded-lg border border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 🧩 File input for multiple images */}
          <div className="mb-5">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {images.length > 0
                ? `${images.length} image(s) uploaded`
                : "Upload Product Images"}

              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
              <div className="flex-1">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1 ml-10">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="flex-1">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1 ml-10">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
            </div>

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="p-3 mb-3 w-full border rounded-lg bg-[#101011] text-white"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            <div className="flex flex-wrap gap-10">
              <div className="flex-1">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={images.length === 0}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-700 transition"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
