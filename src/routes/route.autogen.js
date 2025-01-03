const path = require('path');
const fs = require('fs');
const swaggerAutogen = require('swagger-autogen')();

// Đọc thư mục routes và tự động nhập các route từ v1, v2
const routesFolder = path.join(__dirname, './');

// Duyệt qua tất cả các phiên bản (v1, v2, ...)
fs.readdirSync(routesFolder).forEach((versionFolder) => {
  const versionFolderPath = path.join(routesFolder, versionFolder);

  // Kiểm tra nếu đó là một thư mục
  if (fs.statSync(versionFolderPath).isDirectory()) {
    // Đọc các thư mục con bên trong versionFolder (ví dụ: base, auth, user)
    fs.readdirSync(versionFolderPath).forEach((folder) => {
      const folderPath = path.join(versionFolderPath, folder);

      // Kiểm tra nếu đó là thư mục con
      if (fs.statSync(folderPath).isDirectory()) {
        // Duyệt qua các file route trong thư mục con (ví dụ: base.route.js, auth.route.js)
        fs.readdirSync(folderPath).forEach((file) => {
          // Kiểm tra nếu file có đuôi .route.js
          if (file.endsWith('.route.js')) {
            const routePath = path.join(folderPath, file);
            // const route = require(routePath);

            // Định nghĩa các route theo đường dẫn, thêm phiên bản vào đường dẫn (v1, v2)
            const routeName = folder;  // Sử dụng tên thư mục làm tiền tố đường dẫn (base, auth, user)
            // app.use(`/api/${versionFolder}/${routeName}`, route);  // Kết nối route

            // logger
            console.log({routeName,routePath, versionFolder, routeName})

          }
        });
      }
    });
  }
});
