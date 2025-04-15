import { useState } from "react";
import { motion } from "framer-motion";

const Signup = () => {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Success or error message
  const [loading, setLoading] = useState(false);

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Replace with your backend's URL if different
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("User created successfully!");
        // Optionally, reset form fields:
        setName("");
        setEmail("");
        setRole("");
        setPassword("");
      } else {
        const errorData = await response.json();
        setMessage("Error: " + errorData.error);
      }
    } catch (error: any) {
      setMessage("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-center mb-8 text-gray-800"
        >
          Create Your Account
        </motion.h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="transition-transform"
          >
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          {/* Email Field */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="transition-transform"
          >
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          {/* Role Selection */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="transition-transform"
          >
            <label htmlFor="role" className="block text-gray-700 font-medium">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select your role</option>
              <option value="farmer">Farmer</option>
              <option value="specelist">Specelist</option>
            </select>
          </motion.div>

          {/* Password Field */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="transition-transform"
          >
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </motion.button>
          {/* Display success or error messages */}
          {message && (
            <p className="text-center text-sm font-medium mt-4 text-gray-700">
              {message}
            </p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
