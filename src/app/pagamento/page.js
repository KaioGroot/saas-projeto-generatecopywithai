// pages/checkout.js

"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(142000); // Valor em centavos (72 BRL)
  const [card, setCard] = useState(null);

  //pegar dados do cartão do cardlement do stripe


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { source, error: sourceError } = await stripe.createSource(cardElement, {
      type: "card",
    });

    if (sourceError) {
      console.error("Erro ao criar o token do cartão:", sourceError);
      return;
    }

    try{
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, phone, amount, source: source.id }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Erro ao criar a sessão de pagamento:", data.error);
        return;
      }
      console.log(data)
      }
    catch(error){
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="absolute z-[-20] rounded-full top-50 left-50 w-80 h-80 bg-gradient-to-tr from-yellow-300 to-pink-500 opacity-50 blur-md"></div>
      <div className="fixed top-0 right-0 w-[50vw] h-full bg-gradient-to-l from-transparent to-purple-500 rounded-l-full"></div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto p-4 bg-gradient-to-b z-20 from-[#0000001e] to-[#24245e] shadow-md rounded-md backdrop-blur-md"
      >
        <div className="mb-4">
          <label className="block text-gray-200">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border text-purple-700 border-gray-700 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200">Nome Completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border text-purple-700 border-gray-700 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200">Telefone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border text-purple-700 border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4 bg-purple-200 rounded">
          <CardElement 
            onChange={(event) => {
              const { error, complete } = event;
              if (complete) {
                setCard("Credenciais completas com sucesso!.");
              } else if (error) {
                setCard(`Error: ${error.message}`);
              } else {
                setCard("Crendenciais incompletas. por favor preencha corretamente.");
              }
            }}
            className="p-2 px-4 py-4 border border-purple-300 text-purple-400 rounded-md" 
          />
            {setCard && <p className="text-purple-500">{card}</p>}
        </div>
        <button
          type="submit"
          disabled={!stripe || !elements}
          className="w-full py-2 px-4 bg-purple-500 text-white rounded-md purple:bg-blue-600 transition"
        >
          <svg
            className="w-6 h-6 inline-block mr-4"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 80 80"
            id="dollar-improvement"
          >
            <path d="M46 32c0-3.86-3.14-7-7-7-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3h4c0-3.165-2.112-5.842-5-6.705V13h-4v2.295c-2.888.863-5 3.54-5 6.705 0 3.86 3.14 7 7 7 1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3h-4c0 3.165 2.112 5.842 5 6.705V41h4v-2.295c2.888-.863 5-3.54 5-6.705z"></path>
            <path d="M45.258 75h10a2 2 0 0 0 2-2V59H61a2 2 0 0 0 1.78-2.911l-7.389-14.446C59.005 37.608 61 32.472 61 27c0-12.13-9.87-22-22-22s-22 9.87-22 22 9.87 22 22 22c.819 0 1.63-.06 2.438-.15l-3.703 7.239A2.002 2.002 0 0 0 39.516 59h3.742v14a2 2 0 0 0 2 2zM39 45c-9.925 0-18-8.075-18-18S29.075 9 39 9s18 8.075 18 18c0 3.944-1.273 7.673-3.593 10.764L52.04 35.09a2 2 0 0 0-3.561 0l-4.742 9.269A18.013 18.013 0 0 1 39 45zm3.786 10 4.108-8.03.009-.018 3.355-6.56L57.73 55h-2.472a2 2 0 0 0-2 2v14h-6V57a2 2 0 0 0-2-2h-2.472z"></path>
          </svg>
          Finalizar
        </button>
      </form>
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      
    </div>
  );
};

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

