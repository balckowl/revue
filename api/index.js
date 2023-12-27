// import express from 'express';
// // import { Stripe } from 'stripe'
// const app = express();
// const PORT = 3000;

// app.use(express.json())


// app.post('/api/charge', async (req, res) => {
//     const { token, currency, amount } = req.body
//     const result = await stripe.charges.create({
//         amount,
//         currency,
//         source: token,
//         description: 'Order using Charge API'
//     })

//     res.status(201).json({
//         order_id: result.id
//     })
// })


// app.listen(PORT)