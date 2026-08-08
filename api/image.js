const IMAGE_URL = "https://scontent.fisb6-2.fna.fbcdn.net/v/t39.99422-6/725751206_1412602897569728_4221122279056747848_n.png?stp=dst-jpg_tt6&cstp=mx1466x854&ctp=s1466x854&_nc_cat=101&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_ohc=fKOi9Z5h93EQ7kNvwEi3m93&_nc_oc=Adov3BW9d60bl5lr5DlKLhRfiaROh6HH7g3Vl-XQ9wV1sexNzZmY2yeXUMbzkvUGXmg&_nc_zt=14&_nc_ht=scontent.fisb6-2.fna&_nc_gid=IrqinR77ZbthQR2NXSOfEw&_nc_ss=7b2a8&oh=00_AQFhqx9y7tovdA29AEDA4rT7gEzMXU2lf8vShEPmf7r8ww&oe=6A7D5E6A";

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
