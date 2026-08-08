const IMAGE_URL = "https://scontent.fisb5-2.fna.fbcdn.net/v/t39.84726-6/743796725_1713108693308022_4483855554106468622_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=110&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=92e707&_nc_ohc=RWM1RA03cV8Q7kNvwEaizww&_nc_oc=Ado8qpMGglFtanXrpPgU0OOXeAo3Udqvf4vppJPP0H7xmaRIWvAy9UOh9l4QwkDAUxs&_nc_zt=14&_nc_ht=scontent.fisb5-2.fna&_nc_gid=0GaLvhdWJngOf9NUpStcPw&_nc_ss=7b2a8&oh=00_AQHEj3ibzOtwxQEY9d-74VKdY5ME5RUqd2dGCFgUzgnbvg&oe=6A7D6BC5";

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
