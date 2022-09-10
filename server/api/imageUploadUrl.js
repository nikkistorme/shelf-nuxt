export default defineEventHandler(async (event) => {
  try {
    const body = await useBody(event);
    console.log(
      "🚀 ~ process.env.CLOUDFLARE_API_KEY",
      process.env.CLOUDFLARE_API_KEY
    );
    const data = await fetch(
      "https://api.cloudflare.com/client/v4/accounts/e0d75c4169f2e03212ea796e47db463b/images/v2/direct_upload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
        },
      }
    );
    console.log("🚀 ~ data", data);
    return data;
  } catch (error) {
    return error;
  }
});
