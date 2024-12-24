const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");
const http = require("http");
const net = require("net");

// Create a database connection
mongoose
  .connect(
    "mongodb+srv://2022cs66:221135@cluster0.b8r6x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();

app.use(
  cors({
    origin: "https://ethereal-wear-deploy-frontend-jmwweh4xe-bismafajar816s-projects.vercel.app/",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);

// Check if a port is available
const checkPort = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false)); // Port is in use
    server.once("listening", () => {
      server.close(() => resolve(true)); // Port is available
    });
    server.listen(port);
  });
};

// Try to use the first available port from the list
(async () => {
  const ports = [8080, 3000, 4000];
  let selectedPort = null;

  for (const port of ports) {
    const isAvailable = await checkPort(port);
    if (isAvailable) {
      selectedPort = port;
      break;
    }
  }

  if (selectedPort) {
    app.listen(selectedPort, () =>
      console.log(`Server is now running on port ${selectedPort}`)
    );
  } else {
    console.error("No available ports found!");
  }
})();
