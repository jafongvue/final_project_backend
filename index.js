const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

const dbConfig = {
  host: '',
  user: '',
  password: '',
  database: 'pongvue',
};

// Middleware for parsing JSON data in requests
app.use(express.json());

// API endpoint to get product recommendations for a customer
app.get('/recommendations/:cus_id', async (req, res) => {
  try {
    const customerId = req.params.cus_id;

    // Connect to the database
    const connection = await mysql.createConnection(dbConfig);

    // Step 1: Fetch the details of the product the customer is interested in
    const [customer] = await connection.execute(
      'SELECT type_id, unit_id FROM tb_customer WHERE cus_id = ?',
      [customerId]
    );

    if (!customer.length) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }

    const { type_id, unit_id } = customer[0];

    // Step 2: Find other products with the same type and unit
    const [similarProducts] = await connection.execute(
      'SELECT pro_id, proName, price FROM tb_product WHERE type_id = ? AND unit_id = ? AND pro_id != ?',
      [type_id, unit_id, customerId]
    );

    // Step 3: Recommend products with similar types and units but different pro_id
    res.status(200).json({ recommendations: similarProducts });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    // Close the database connection
    if (connection) {
      connection.end();
    }
  }
});
app.get('/customer',async (req,res)=>{
try {
    const connection = await mysql.createConnection(dbConfig);

    // Step 1: Fetch the details of the product the customer is interested in
    const [customer] = await connection.execute(
      'SELECT type_id, unit_id FROM tb_customer',
    );

   

    // Step 3: Recommend products with similar types and units but different pro_id
    res.status(200).json({ recommendations: customer });
} catch (error) {
    return res.json(error.message)
}
})

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});