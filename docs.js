module.exports.documentation = {
  message: "Welcome to my app api!",
  documentationUrl: "", //leave this also blank for the first exercise
  baseUrl: "", //leave this blank for the first exercise
  endpoints: [
    {
      method: "GET",
      path: "/api",
      description: "Describes all available endpoints",
    },
    { method: "GET", path: "/api/profile", description: "Data about me" },
    {
      method: "GET",
      path: "/api/books/",
      description: "Get All books information",
    },
    {
      method: "POST",
      path: "/api/books/",
      description: "Create a new book",
      body: {
        title: "String",
        author: "String",
        releaseDate: "String",
        genre: "String",
        rating: "String",
        language: "String",
      },
      statusCodes: [
        {
          code: 201,
          description: "DB entry has been created",
        },
        {
          code: 400,
          description: "Invalid request body",
        },
      ],
    },
    {
      method: "PUT",
      path: "/api/books/:id",
      description: "Update an existing book",
      body: {
        title: "String",
        author: "String",
        releaseDate: "String",
        genre: "String",
        rating: "String",
        language: "String",
      },
      statusCodes: [
        {
          code: 200,
          description: "Book has been updated",
        },
        {
          code: 400,
          description: "Invalid request body",
        },
      ],
    },
    {
      method: "DELETE",
      path: "/api/books/:id",
      description: "Delete an existing book",
      statusCodes: [
        {
          code: 200,
          description: "Book has been deleted",
        },
        {
          code: 404,
          description: "Book doesn't exist",
        },
      ],
    },
  ],
};
