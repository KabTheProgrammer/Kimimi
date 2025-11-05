import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductDetailsQuery,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const { _id: productId } = useParams();

  const { data: productData, isLoading } = useGetProductDetailsQuery(productId);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { data: categories = [] } = useFetchCategoriesQuery();

  const navigate = useNavigate();

  // Product fields
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");

  // Load product data into state
  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id || productData.category || "");
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImages(productData.images || (productData.image ? [productData.image] : []));
    }
  }, [productData]);

  // Upload new images to Cloudinary
  const uploadFileHandler = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const uploaders = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_uploads");

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/dcfhhdtjr/image/upload`, {
          method: "POST",
          body: formData,
        });
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

  // Remove an image from list
  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  // Handle form submit (update)
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
        image: images[0] || "", // primary thumbnail
        images,
      };

      await updateProduct({ productId, productData }).unwrap();
      toast.success("Product successfully updated");
      navigate("/admin/allproductslist");
    } catch (err) {
      console.error(err);
      toast.error("Product update failed. Try again.");
    }
  };

  // Delete product
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) return;

      await deleteProduct(productId).unwrap();
      toast.success("Product successfully deleted");
      navigate("/admin/allproductslist");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed. Try again.");
    }
  };

  if (isLoading) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <h2 className="text-2xl font-semibold mb-6 text-white">Update / Delete Product</h2>

          {/* 🖼️ Image Preview Gallery */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`product-${index}`}
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

          {/* 📤 Upload new images */}
          <div className="mb-5">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              Add More Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          {/* 🧾 Product Form */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
              <div className="flex-1">
                <label htmlFor="name">Name</label> <br />
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
                <label htmlFor="price">Price</label> <br />
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
                <label htmlFor="quantity">Quantity</label> <br />
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
                <label htmlFor="brand">Brand</label> <br />
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

            <label>Description</label>
            <textarea
              className="p-3 mb-3 w-full border rounded-lg bg-[#101011] text-white"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <div className="flex justify-between gap-10">
              <div className="flex-1">
                <label htmlFor="category">Category</label> <br />
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

            {/* 🧩 Buttons */}
            <div className="flex gap-5 mt-6">
              <button
                type="submit"
                className="py-4 px-10 rounded-lg text-lg font-bold bg-green-600 hover:bg-green-700 transition"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="py-4 px-10 rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-700 transition"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
