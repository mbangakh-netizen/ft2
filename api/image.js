const IMAGE_URL = "https://scontent.fisb5-1.fna.fbcdn.net/v/t45.5328-4/767131402_2427239634464277_6741396560748133772_n.jpg?_nc_cat=103&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=247b10&_nc_ohc=Ivy_orHbDFYQ7kNvwFupRnp&_nc_oc=Adrho2zGSpYHpuRIVvnyzctPzd2RgTJOUh0qHEAgshHgSLkZJczaGvUN3ImIK-xQooQ&_nc_zt=23&_nc_ht=scontent.fisb5-1.fna&_nc_gid=GNsspj2pP8rl2yLR-tgMIw&_nc_ss=7b2a8&oh=00_AQHsegnZs-9i2L3hb7728Ws10D6h1eV6KYR2YPZWEMCPow&oe=6A7D696B";

module.exports = async (req, res) => {
  try {
    const response = await fetch(IMAGE_URL);

    if (!response.ok) {
      return res.status(response.status).send("Could not fetch image");
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=3600");

    return res.status(200).send(buffer);
  } catch (error) {
    return res.status(500).send("Image proxy error");
  }
};
