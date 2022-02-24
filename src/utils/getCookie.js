export default function getCookie() {
  return document.cookie.split("; ").reduce((acc, item) => {
    const [name, value] = item.split("=");

    return { ...acc, [name]: value };
  }, {});
}
