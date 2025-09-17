module.exports = {
  apps: [
    {
      name: 'backend',
      script: './backend/bootstrap.js',
      cwd: '/app/backend',
      env: {
        NODE_ENV: 'production',
        PORT: 7001
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: '/var/log/pm2/backend-error.log',
      out_file: '/var/log/pm2/backend-out.log'
    },
    {
      name: 'nginx',
      script: 'nginx',
      args: '-g "daemon off;"',
      interpreter: 'none',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: '/var/log/pm2/nginx-error.log',
      out_file: '/var/log/pm2/nginx-out.log'
    }
  ]
};