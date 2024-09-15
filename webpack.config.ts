module.exports = {
    entry: './src/main.ts', // Entry point of your application
    output: {
      filename: 'bundle.js', // Output filename for the bundle
      path: __dirname + '/dist', // Output directory for the bundled files
    },
    module: {
      rules: [
        // Loaders for processing different file types (optional)
      ],
    },
  };
  