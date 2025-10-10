import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import axios from "axios"
import asyncHandler from "../middlewares/asyncHandler.js";

// Utility Function
function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxRate = 0.04;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);

  const totalPrice = (
    itemsPrice +
    shippingPrice +
    parseFloat(taxPrice)
  ).toFixed(2);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice,
    totalPrice,
  };
}

const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  console.log("🧾 Incoming Order Body:", req.body);

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const enrichedOrderItems = [];

  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.product}`);
    }

    // just check stock, don't reduce
    if (product.quantity < item.qty) {
      res.status(400);
      throw new Error(`Not enough stock for ${product.name}`);
    }

    enrichedOrderItems.push({
      name: product.name,
      image: product.image,
      price: product.price,
      qty: item.qty,
      product: product._id,
    });
  }

  const order = new Order({
    orderItems: enrichedOrderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid: false,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};




const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id username");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserOrders = async (req, res) => {

  try {
    const orders = await Order.find({ user: req.user._id });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};



const countTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const calculateTotalSales = async (req, res) => {
  try {
    const orders = await Order.find();
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    res.json({ totalSales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const calcualteTotalSalesByDate = async (req, res) => {
  try {
    const salesByDate = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.json(salesByDate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markOrderAsPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("orderItems.product");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Mark as paid
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer?.email_address,
  };

  // ✅ Reduce stock for each item
  for (const item of order.orderItems) {
  const product = await Product.findById(item.product);

  if (product) {
    if (product.quantity < item.qty) {
      res.status(400);
      throw new Error(`Not enough stock for ${product.name}`);
    }
    product.quantity -= item.qty;   // ✅ correct field
    await product.save();
  }
}

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

const markOrderAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const initiatePayment = async (req, res) => {
  const { email, amount, paymentMethod } = req.body;

  try {
    if (paymentMethod !== 'paystack') {
      return res.status(400).json({ status: 'error', message: 'Unsupported payment method' });
    }

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      { email, amount: amount * 100, currency: 'GHS' },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Backend only
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ status: 'success', data: response.data });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.response?.data.message || error.message,
    });
  }
};


const updateOrderToPaid = asyncHandler(async (req, res) => {
  console.log("🔥 updateOrderToPaid endpoint HIT:", req.params.id);
  const order = await Order.findById(req.params.id).populate("orderItems.product");

  if (!order) {
    res.status(404);
    throw new Error("Order not found"); 
  }

  // Mark as paid
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };

  // 🔥 Reduce product stock after successful payment
  for (const item of order.orderItems) {
    const product = await Product.findById(item.product);
    if (product) {
      if (product.quantity < item.qty) {
        res.status(400);
        throw new Error(`Not enough stock for ${product.name}`);
      }
      product.quantity -= item.qty;
      await product.save();
    }

  }

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});


export {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calcualteTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
  initiatePayment,
  updateOrderToPaid
};