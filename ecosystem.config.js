module.exports = {
  apps: [
    {
      name: "nginx",
      script: "nginx",
      args: "-g 'daemon off;'",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "backend",
      script: "node",
      args: "backend/bootstrap.js",
      env: {
        NODE_ENV: "production",
        PORT: 7001,
      },
    },
  ],
};