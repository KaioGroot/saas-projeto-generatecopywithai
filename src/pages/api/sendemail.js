import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const { email, name } = req.body;
        console.log(req.body);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kaiomagalhaesxp@gmail.com',
                pass: '[YOURPASS]',
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Welcome to our app',
            text: `Hello ${name}, welcome to our app!`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json({ message: 'email sent' });
    }
}
