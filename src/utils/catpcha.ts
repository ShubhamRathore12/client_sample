export async function getCaptcha(): Promise<string> {
  return new Promise((res, rej) => {
    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_SITE_KEY, { action: "submit" })
        .then((token) => res(token))
        .catch((err) => rej(err));
    });
  });
}
