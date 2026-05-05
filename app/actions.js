"use server";

/*
  Contoh Server Action untuk nanti saat database Supabase sudah siap.
  MVP di folder ini sengaja memakai localStorage agar langsung bisa dicoba tanpa setup database.
  Saat integrasi, panggil action ini dari form payment/checkout lalu insert ke tabel:
  borrowings, borrowing_items, payments, dan notifications.
*/

export async function createBorrowingAction(formData) {
  const payload = {
    userId: formData.get("user_id"),
    libraryId: formData.get("library_id"),
    paymentMethod: formData.get("payment_method"),
    pickupDate: formData.get("pickup_date"),
    returnDate: formData.get("return_date"),
    status: "pending"
  };

  // TODO SUPABASE:
  // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  // const { data, error } = await supabase.from("borrowings").insert(payload).select().single();
  // if (error) return { ok: false, message: error.message };
  // return { ok: true, data };

  return {
    ok: true,
    message: "Mock Server Action berhasil. Ganti bagian TODO dengan insert Supabase.",
    data: payload
  };
}
