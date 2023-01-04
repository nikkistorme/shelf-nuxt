export default defineEventHandler(async (event) => {
  try {
    const url = await useBody(event);
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    return base64;
  } catch (err) {
    return err;
  }
});
