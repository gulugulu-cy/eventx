module.exports = {
  apps: [
    {
      name: 'backend',
      script: './bootstrap.js',
      cwd: '/app/backend',
      env: {
        NODE_ENV: 'production',
        PORT: 7001
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: '/var/log/pm2/backend-error.log',
      out_file: '/var/log/pm2/backend-out.log'
    }
  ]
};