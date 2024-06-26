export const swaggerDocument = {
  info: {
    title: "Digital Wallet",
    description: "A Digital Wallet to simplify your transactions",
    version: "0.10.0",
    contact: {
      email: "felipegoncalvesdsantos@gmail.com",
    },
  },
  basePath: "/v1",
  openapi: "3.1.0",
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/ping": {
      get: {
        description: "Verify if application is working",
        tags: [],
        produces: ["application/json"],
        parameters: [{}],
        responses: {
          "200": {
            description: "pong",
          },
        },
      },
    },
    "/login": {
      get: {
        description: "Login into server to receive your token to use API",
        tags: ["User"],
        produces: ["application/json"],
        parameters: [
          {
            name: "email",
            description: "A valid email of customer",
            in: "formData",
            required: true,
            type: "string",
          },
          {
            name: "password",
            description: "",
            in: "formData",
            required: true,
            type: "string",
          },
        ],
        responses: {
          "200": {
            description: "pong",
            schema: {},
          },
        },
      },
    },
    "/user": {
      put: {
        description: "Create new user",
        tags: ["User"],
        security: [{ BearerAuth: [] }],
        produces: ["application/json"],
        parameters: [
          {
            name: "fullname",
            description: "Full Name of customer",
            in: "formData",
            required: true,
            type: "string",
          },
          {
            name: "CPF_CNPJ",
            description: "A Official Document (cpf, cnpj)",
            in: "formData",
            required: true,
            type: "string",
          },
          {
            name: "email",
            description: "A valid email of customer",
            in: "formData",
            required: true,
            type: "string",
          },
          {
            name: "password",
            description: "",
            in: "formData",
            required: true,
            type: "string",
          },
          {
            name: "phone",
            description: "",
            in: "formData",
            required: true,
            type: "string",
          },
        ],
        responses: {
          "200": {
            description: "JSON Object returned",
            schema: {
              type: "object",
              $ref: "#/definitions/Default",
            },
          },
        },
      },
    },
    "/deposit": {
      put: {
        description: "Deposit money into an account",
        tags: ["Wallet"],
        security: [{ BearerAuth: [] }],
        produces: ["application/json"],
        parameters: [],
        responses: {
          "200": {
            description: "Cash deposited successfully",
            schema: {
              type: "object",
              $ref: "#/definitions/Default",
            },
          },
          "401": {
            description: "Deposit cannot be done",
            schema: {
              type: "object",
              $ref: "#/definitions/Default",
            },
          },
        },
      },
    },
    "/withdraw": {
      put: {
        description: "Withdraw money of you account",
        tags: ["Wallet"],
        security: [{ BearerAuth: [] }],
        produces: ["application/json"],
        parameters: [],
        responses: {
          "200": {
            description: "Cash withdrawn successfully",
            schema: {
              type: "object",
              $ref: "#/definitions/Default",
            },
          },
          "401": {
            description: "Deposit cannot be done",
            schema: {
              type: "object",
              $ref: "#/definitions/Default",
            },
          },
        },
      },
    },
    "/transaction": {
      post: {
        description: "Make a cash transferency between two accounts",
        tags: ["Transaction"],
        security: [{ BearerAuth: [] }],
        produces: ["application/json"],
        parameters: [
          {
            name: "payer_email",
            description: "",
            required: true,
            type: "string",
          },
          {
            name: "seller_email",
            description: "",
            required: true,
            type: "string",
          },
          {
            name: "value",
            description: "",
            required: true,
            type: "number",
          },
        ],
        responses: {
          "200": {
            description: "JSON Object returned",
            schema: {
              type: "object",
              $ref: "#/definitions/Default",
            },
          },
          "401": {
            description: "Deposit cannot be done",
            schema: {
              type: "object",
              $ref: "#/definitions/Default",
            },
          },
        },
      },
    },
  },
  definitions: {
    Default: {
      properties: {
        status: {
          type: "string",
        },
        message: {
          type: "string",
        },
      },
    },
  },
  responses: {},
  parameters: {},
  tags: [
    {
      name: "User",
      description: "User management and login",
    },
    {
      name: "Wallet",
      description: "Wallet managment",
    },
    {
      name: "Transaction",
      description: "Session responsible for movimentation betweeen wallets",
    },
  ],
};
