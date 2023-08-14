const db = require('../db/db');
const express = require('express');
const ContentBasedRecommender = require('content-based-recommender');
const router = express.Router();

const recommender = new ContentBasedRecommender({
  minScore: 0.1,
  maxSimilarDocuments: 100
});

router.get('/:id', (req, res) => {
  const placeId = req.params.id;

  // Query for orderActivities
  db.query("SELECT pro.*, t.typeName, COUNT(*) AS counting FROM tb_orderdetails detail INNER JOIN tb_product pro ON pro.pro_id = detail.pro_id INNER JOIN tb_type t ON t.type_id = pro.type_id INNER JOIN th_order orders ON orders.order_id = detail.order_id WHERE orders.cus_id = ? GROUP BY detail.pro_id ORDER BY counting DESC", [placeId], (error, orderActivities) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
//  console.log(orderActivities);
    // Query for all products and their types
    db.query("SELECT tb_product.*, tb_type.typeName FROM tb_product INNER JOIN tb_type ON tb_type.type_id = tb_product.type_id", (error, allProducts) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
// console.log(allProducts);
      // Create documents array for training the recommender
      const documents = allProducts.map((el) => {
        return {
          id: el.pro_id,
          content: el.type_id.toString()
        };
      });
    //  console.log(documents);
      // Start training the recommender
     recommender.train(documents);

      // Get top 10 similar items for each product in orderActivities
      let similar = [];
      for (const activity of orderActivities) {
        const similarDocuments = recommender.getSimilarDocuments(activity.pro_id, 0, 10);
        similar = [...similar, ...similarDocuments];
      }
//  console.log('similar:',similar);
      // Group IDs with the highest score
      const highestScoreMap = new Map();
      for (const item of similar) {
        const { id, score } = item;
        if (!highestScoreMap.has(id) || score > highestScoreMap.get(id)) {
          highestScoreMap.set(id, score);
        }
      }
      

      // Result with grouped IDs and their highest scores
      const result = [];
      highestScoreMap.forEach((score, id) => {
        result.push({ id, score });
      });
      result.sort((a, b) => b.score - a.score);
       console.log("hsagdbfdhk",result);

      // Get product details for each recommended product
      const data = [];
      let counter = 0;

      function getProductDetails() {
        if (counter === result.length) {
          // All product details fetched, send the response
          const response = [...data];
          // console.log(response);
          res.json(response);
          return;
        }

        const productId = result[counter].id;
        db.query("SELECT pro.*, t.typeName, u.unitName,COUNT(*) AS counting FROM tb_product pro INNER JOIN tb_type t ON t.type_id = pro.type_id INNER JOIN tb_unit u ON u.unit_id = pro.unit_id WHERE pro.pro_id = ? GROUP BY pro_id", [productId], (err, product) => {
          if (err) {
            // Handle the error and continue with other products
            console.log(`Error fetching product details for ID ${productId}: ${err.message}`);
          } else {
            data.push(product[0]);
          }

          counter++;
          getProductDetails(); // Recursively fetch next product details
        });
      }

      getProductDetails();
    });
  });
});

module.exports = router;

// router.get('/:id', (req, res) => {
//     try {
//         const placeId = req.params.id;
//         // console.log(placeId);

//         // Query for orderActivities
//         db.query("SELECT pro.*, t.typeName, COUNT(*) AS counting FROM tb_orderdetails detail INNER JOIN tb_product pro ON pro.pro_id = detail.pro_id INNER JOIN tb_type t ON t.type_id = pro.type_id INNER JOIN th_order orders ON orders.order_id = detail.order_id WHERE orders.cus_id = ? GROUP BY detail.pro_id ORDER BY counting DESC", [placeId], (error, orderActivities) => {
//           if (error) {
//             res.status(500).json({ error: error.message });
//             return;
//           }
//         //   console.log(orderActivities);
      
//           // Query for all products and their types
//           db.query("SELECT tb_product.*, tb_type.typeName FROM tb_product INNER JOIN tb_type ON tb_type.type_id = tb_product.type_id", (error, allProducts) => {
//             if (error) {
//               res.status(500).json({ error1:error.message });
//               return;
//             }
//             // console.log(allProducts);
      
//             // Create documents array for training the recommender
//             const documents = allProducts.map((el) => {
//               return {
//                 id: el.pro_id,
//                 content: el.typeName
//               };
//             });
      
//             // Start training the recommender
//             recommender.train(documents);
      
//             // Get top 10 similar items for each product in orderActivities
//             let similar = [];
//             for (const activity of orderActivities) {
//               const similarDocuments = recommender.getSimilarDocuments(activity.pro_id, 0, 10);
//               similar = [...similar, ...similarDocuments];
//             }
      
//             // Group IDs with the highest score
//             const highestScoreMap = new Map();
//             for (const item of similar) {
//               const { id, score } = item;
//               if (!highestScoreMap.has(id) || score > highestScoreMap.get(id)) {
//                 highestScoreMap.set(id, score);
//               }
//             }
      
//             // Result with grouped IDs and their highest scores
//             const result = [];
//             highestScoreMap.forEach((score, id) => {
//               result.push({ id, score });
//             });
//             result.sort((a, b) => b.score - a.score);

//             let data = []
// 		async function getData() {
// 			 result.map((el) => {
// 				 db.query("SELECT pro.*,t.typeName,u.unitName FROM tb_product pro INNER JOIN tb_type t ON t.type_id = pro.type_id inner join tb_unit u on u.unit_id=pro.unit_id WHERE pro.pro_id =  " + el.id,(err,product)=>{
//                     if(err) return err.message
//                  });
// 				data = [...data, ...product];
// 			});
// 		}

// 		 getData()
// 		  db.query("SELECT pro.*, COUNT(*) AS counting FROM tb_orderdetails detail INNER JOIN tb_product pro ON pro.id = detail.pro_id inner join th_order orders on orders.order_id=detail.orders_id WHERE orders.cus_id = ? GROUP BY pro.pro_id",[placeId],(err,places))
// 		const response = [
// 			...places, ...data
// 		]
// 		res.json(response);
      
//         //     res.json(result);
//           });
//         });
//     } catch (error) {
//         console.log(error);
//         res.json({err:error.message})
//     }
 
// });

// module.exports = router;