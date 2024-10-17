export async function GET({ request, platform }) {
  let result = await platform.env.DB.prepare(
    "SELECT * FROM dev_posts LIMIT 5"
  ).run();
  return new Response(JSON.stringify(result));
}
