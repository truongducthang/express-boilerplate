module.exports = {
  "apps": [
    {
      name: "app",
      script: "src/index.js",
      instances: 1, // Number of instances
      autorestart: true, // Automatically restart when there is an error
      watch: false, // No need to watch in production
      time: true, // Log time
      env: {
        NODE_ENV: 'development', // Default environment
        PORT: process.env.PORT || 3000, // Default port if not in .env
        MONGODB_URL: process.env.MONGODB_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_ACCESS_EXPIRATION_MINUTES: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
        JWT_REFRESH_EXPIRATION_DAYS: process.env.JWT_REFRESH_EXPIRATION_DAYS,
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_USERNAME: process.env.SMTP_USERNAME,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD,
        EMAIL_FROM: process.env.EMAIL_FROM,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 8080, // Port for production
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: process.env.PORT || 8080, // Port for development
      },
      env_test: {
        NODE_ENV: 'test',
        PORT: process.env.PORT || 4000,
        MONGODB_URL: 'mongodb://localhost:27017/test-node-boilerplate', // Can specify separate MongoDB test
      },
    }
  ]
}
