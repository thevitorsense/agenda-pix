const API_TOKEN = '22087|3sI0vvVA70KRDDPbzH6WZdzr6JWmiYFOiz52H7wCf874b044';
const API_BASE = 'https://api.pushinpay.com.br/api';

export async function generatePixPayment(amount: number) {
  try {
    const response = await fetch(`${API_BASE}/pix/cashIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        value: amount * 100, // Convert to cents
        webhook_url: `${window.location.origin}/api/webhook`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate PIX payment');
    }

    const data = await response.json();
    return {
      id: data.id,
      qr_code: data.qr_code,
      qr_code_base64: data.qr_code_base64,
    };
  } catch (error) {
    console.error('Error generating PIX payment:', error);
    throw error;
  }
}

export async function checkPaymentStatus(transactionId: string): Promise<PaymentStatus> {
  try {
    const response = await fetch(`${API_BASE}/transaction/${transactionId}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to check payment status');
    }

    const data = await response.json();
    return {
      id: transactionId,
      status: data.status,
    };
  } catch (error) {
    console.error('Error checking payment status:', error);
    throw error;
  }
}
