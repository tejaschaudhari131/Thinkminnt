import express from 'express';
import crypto from 'crypto';
import db from '../db-client.js';

const router = express.Router();

// Environment variables should be set in .env file
// PAYU_KEY=your_merchant_key
// PAYU_SALT=your_merchant_salt

router.post('/hash', (req, res) => {
    try {
        const { txnid, amount, productinfo, firstname, email } = req.body;

        if (!txnid || !amount || !productinfo || !firstname || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const key = process.env.PAYU_KEY;
        const salt = process.env.PAYU_SALT;

        if (!key || !salt) {
            console.error('PayU credentials not found in environment variables');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Hash Sequence: key|txnid|amount|productinfo|firstname|email|||||||||||salt
        const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;

        const hash = crypto.createHash('sha512').update(hashString).digest('hex');

        res.json({ hash, key });
    } catch (error) {
        console.error('Error generating hash:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/response', async (req, res) => {
    try {
        const { txnid, status, amount, productinfo, firstname, email, hash, key } = req.body;
        const salt = process.env.PAYU_SALT;

        if (!salt) {
            console.error('PayU Salt not found');
            return res.status(500).send('Server configuration error');
        }

        // Verify the hash from PayU response to ensure authenticity
        // Reverse Hash Sequence: salt|status|||||||||||email|firstname|productinfo|amount|txnid|key
        const hashString = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
        const calculatedHash = crypto.createHash('sha512').update(hashString).digest('hex');

        if (calculatedHash !== hash) {
            console.error('Hash verification failed!');
            console.error('Calculated:', calculatedHash);
            console.error('Received:', hash);
            return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/#/donate?status=failure&txnid=${txnid}&error=security_breach`);
        }

        console.log('Payment Response Verified:', status);

        if (status === 'success') {
            try {
                // Record donation in database
                // Note: Frequency is defaulted to 'One-Time' as it's not currently passed in productinfo. 
                // In a future update, productinfo should include the frequency.
                const insertDonation = db.prepare('INSERT INTO donations (txnid, amount, donorName, donorEmail, frequency, paymentMethod, status) VALUES (?, ?, ?, ?, ?, ?, ?)');
                await insertDonation.run(txnid, amount, firstname, email, 'One-Time', 'PayU', 'success');
                console.log(`Donation recorded: ${txnid} by ${firstname}`);
            } catch (dbError) {
                console.error('Database Error recording donation:', dbError);
                // We still redirect to success because the payment was successful
            }

            res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/#/donate?status=success&txnid=${txnid}`);
        } else {
            res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/#/donate?status=failure&txnid=${txnid}`);
        }
    } catch (error) {
        console.error('Error processing payment response:', error);
        res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/#/donate?status=failure&error=server_error`);
    }
});

export default router;
