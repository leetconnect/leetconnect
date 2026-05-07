import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { paymentsApi } from "@/lib/api";
import { DollarSign, CreditCard, CheckCircle } from "lucide-react";

const PaymentPage = () => {
  const { id } = useParams();
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await paymentsApi.getById(id!);
        setPayment(res.payment);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id]);

  const payNow = async () => {
    try {
      setPaying(true);
      await paymentsApi.pay(id!);

      alert("Payment successful");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return <div className="text-white p-6">Loading...</div>;
  }

  if (!payment) {
    return <div className="text-white p-6">Payment not found</div>;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">

      {/* CARD */}
      <div className="w-full max-w-md bg-[#111] border border-gray-800 rounded-2xl p-6 shadow-lg">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
            <CreditCard className="text-green-400" />
          </div>

          <div>
            <h1 className="text-white text-xl font-bold">
              Payment Checkout
            </h1>
            <p className="text-gray-400 text-sm">
              Secure manual payment
            </p>
          </div>
        </div>

        {/* AMOUNT */}
        <div className="bg-[#0A0A0A] border border-gray-800 rounded-xl p-4 mb-5">
          <p className="text-gray-400 text-sm">Amount to pay</p>

          <div className="flex items-center gap-2 mt-2">
            <DollarSign className="text-green-400" />
            <span className="text-2xl font-bold text-white">
              {payment.amount}
            </span>
          </div>
        </div>

        {/* STATUS */}
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle className="text-yellow-400" size={18} />
          <span className="text-sm text-gray-300">
            Status: {payment.status}
          </span>
        </div>

        {/* BUTTON */}
        <button
          onClick={payNow}
          disabled={paying}
          className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-black font-semibold py-3 rounded-xl transition"
        >
          {paying ? "Processing..." : "Pay Now"}
        </button>

      </div>
    </div>
  );
};

export default PaymentPage;