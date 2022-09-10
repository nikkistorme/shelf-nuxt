export default defineEventHandler(async (event) => {
  try {
    const response = await fetch(
      "https://api.cloudflare.com/client/v4/accounts/e0d75c4169f2e03212ea796e47db463b/images/v2/direct_upload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    return data.result;
  } catch (error) {
    return error;
  }
});
