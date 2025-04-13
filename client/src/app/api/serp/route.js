// app/api/serp/route.js
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const place = searchParams.get("place");

  const apiKey = process.env.NEXT_PUBLIC_SERP;

  const url = `https://serpapi.com/search.json?engine=google_images&q=${encodeURIComponent(
    place
  )}&location=India&google_domain=google.co.in&gl=in&hl=en&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch from SerpApi" }),
      {
        status: 500,
      }
    );
  }
}
