export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingDetails {
  date: Date | null;
  time: string | null;
}

export interface PixResponse {
  id: string;
  qr_code: string;
  qr_code_base64: string;
}

export interface PaymentStatus {
  id: string;
  status: 'pending' | 'paid' | 'approved' | 'failed';
}
