import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app: any) {
  app.use(
    createProxyMiddleware("/users", {
      target: "http://apis.data.go.kr/",
      changeOrigin: true,
    }),
  );
};
