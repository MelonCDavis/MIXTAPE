export default function jsonp(url) {
  return new Promise((resolve, reject) => {
    const callbackName = "jsonp_callback_" + Math.round(Math.random() * 1e8);

    const fullUrl = `${url}&callback=${callbackName}`;

    window[callbackName] = function (data) {
      delete window[callbackName];
      document.body.removeChild(script);
      resolve(data);
    };

    const script = document.createElement("script");
    script.src = fullUrl;
    script.onerror = () => {
      delete window[callbackName];
      reject(new Error("JSONP request failed"));
    };

    document.body.appendChild(script);
  });
}
