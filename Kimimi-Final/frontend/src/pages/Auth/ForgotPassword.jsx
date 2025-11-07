import { useState } from "react";
import { useForgotPasswordMutation } from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message || "Password reset link sent to your email.");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send reset email");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80')",
      }}
    >
      <form
        onSubmit={submitHandler}
        className="bg-white bg-opacity-70 shadow-lg p-10 rounded-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-black mb-6" >
          Forgot Password
        </h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-3 w-full rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-pink-500 text-white w-full py-2 rounded hover:bg-pink-600"
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
