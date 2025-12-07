/// صرفا یک مثال برای استفاده Optimistic UI Update with Rollback در پروژه است
// export async function reserveStock(id: string, delta: number) {
//   const res = await fetch("/api/cart/reserve-stock", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     // رزرو مقدار دلتا
//     body: JSON.stringify({ id, delta }),
//   });
//   // { success: boolean }
//   return res.json();
// }

// export async function releaseStock(id: string, delta: number) {
//   const res = await fetch("/api/cart/release-stock", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ id, delta }),
//   });
//   return res.json();
// }
