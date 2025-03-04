import { metadata } from "@/app/layout";
import { stripe } from "@/lib/stripe";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;

      // Verifique se o email está correto
      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Email inválido.' });
      }

      // Listar clientes com base no email fornecido
      const customers = await stripe.customers.list({
        email: email,
        limit: 1,
      });

      if (customers.data.length === 0) {
        return res.status(404).json({ error: 'Cliente não encontrado.' });
      }else{
        console.log(customers.data[0]);
      }

      const customerId = customers.data[0].id;

      // Listar transações (charges) associadas ao cliente
      const charges = await stripe.subscriptions.list({
        customer: customers.data[0].id,
      });


      if (charges) {
        const validCharges = charges.data.filter((charge) => {
          const chargeDate = new Date(charge.created * 1000);
          const today = new Date();
          const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

          return chargeDate >= oneMonthAgo;
        });
        console.log(validCharges);
      }
      

      res.status(200).json(charges.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
