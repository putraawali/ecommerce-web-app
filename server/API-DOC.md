# E-COMMERCE

## API Documentation

## USER Documentation

### POST /register

_Request Header_

```
Not needed
```

_Request Body_

```
  {
    "username": "<your username>, on validation not empty and constraint unique",
    "email": "<your email>, on validation is email and constraint unique",
    "password": "<your password> on validation not empty"
  }
```

_Response (201 - Created)_

```
  {
    "id": "<your id created by server>",
    "username": "<your username>",
    "email": "<your email>",
    "isAdmin": "<your admin status>"
  }
```

_Response (400 - Bad Request)_

```
  {
    "message": ["Username is required", "Please input email using email format", "Password is required"]
  }
```

_Response (500 - Internal Server Error)_

```
  {
    "message": "Internal server error"
  }
```

### POST /login

_Request Header_

```
Not needed
```

_Request Body_

```
  {
    "email": "<your email>",
    "password": "<your password>"
  }
```

_Response (200 - Ok)_

```
  {
    "access_token": "<your access token>",
    "username": "<your username>"
  }
```

_Response (400 - Bad Request)_

```
  {
    "message": "Invalid email/password"
  }
```

_Response (400 - Bad Request)_

```
  {
    "message": ["Please input email using email format", "Password is required"]
  }
```

_Response (500 - Internal Server Error)_

```
  {
    "message": "Internal server error"
  }
```

## PRODUCT Documentation

### GET /products/:category

_Request Header_

```
Not needed
```

_Request Body_

```
  {
    "category": "<product category>"
  }
```

_Response (200 - Ok)_

```
  [
    {
    "id": "<products id generate by server>",
    "name": "<products name>",
    "price": "<product price>",
    "stock": "<product stock>",,
    "status": "<product status>",
    "image_url": "<product image_url>",
    "category": "<product category>"
    },
    {
    "id": "<products id generate by server>",
    "name": "<products name>",
    "price": "<product price>",
    "stock": "<product stock>",,
    "status": "<product status>",
    "image_url": "<product image_url>",
    "category": "<product category>"
    }
  ]
```

_Response (500 - Internal Server Error)_

```
  {
    "message": "Internal server error"
  }
```

### POST /products

_Request Header_

```
  {
    "access_token": "<your access token>"
  }
```

_Request Body_

```
  {
    "name": "<your product name> on validation not empty",
    "price": "<your product price> on validation minimum is 0, not empty, and isNumeric",
    "stock": "<your product stocks> on validation minimum is 0, not empty, and isNumeric",
    "image_url": "<product image_url> on validation isUrl",
    "category": "<product category> on validation not empty"
  }
```

_Response (201 - Created)_

```
  {
    "id": "<product id generate by server>",
    "name": "<product name>",
    "price": "<product price>",
    "stock": "<product price>",
    "status": "<product status>",
    "image_url": "<product image_url>",
    "category": "<product category>"
  }
```

_Response (400 - Bad Request)_

```
  {
    "message": ["Product name is required", "Please input image using url format", "Price is required", "Price must be number", "Price minimum is 0", "Stock must be number", "Stock is required", "Stock minimum is 0", "Category is Required"]
  }
```

_Response (401 - Unauthorize)_

```
{
  "message": "Please login first"
}
```

_Response (401 - Unauthorize)_

```
  {
    "message": "You are not admin"
  }
```

_Response (500 - Internal server error)_

```
  {
    "message": "Internal server error"
  }
```

### GET /products/get/:id

_Request Header_

```
  {
    "access_token": "<your access token>"
  }
```

_Request Params_

```
  {
    "id": "<product id>"
  }
```

_Request Body_

```
Not needed
```

_Response (200 - OK)_

```
  {
    "id": "<product id>",
    "name": "<product name>",
    "price": "<product price>"
    "stock": "<product stocks>",
    "status": "<product status>",
    "image_url": "<product image_url>",
    "category": "<product category>"
  }
```

_Response (401 - Unauthorize)_

```
{
  "message": "Please login first"
}
```

_Response (401 - Unauthorize)_

```
  {
    "message": "You are not admin"
  }
```

_Response (500 - Internal server error)_

```
  {
    "message": "Internal server error"
  }
```

### PATCH /products/:id

_Request Header_

```
  {
    "access_token": "<your access token>"
  }
```

_Request Params_

```
  {
    "id": "<product id>"
  }
```

_Request Body_

```
  {
    "status": "<product status>"
  }
```

_Response (200 - Ok)_

```
  {
    "id": "<product id generate by server>",
    "name": "<product name>",
    "price": "<product price>",
    "stock": "<product price>",
    "status": "<updated product status>",
    "image_url": "<updated product image_url>",
    "category": "<updated product category>"
  }
```

_Response (401 - Unauthorize)_

```
{
  "message": "Please login first"
}
```

_Response (401 - Unauthorize)_

```
  {
    "message": "You are not admin"
  }
```

_Response (500 - Internal server error)_

```
  {
    "message": "Internal server error"
  }
```

### PUT /products/:id

_Request Header_

```
  {
    "access_token": "<your access token>"
  }
```

_Request Params_

```
  {
    "id": "<product id>"
  }
```

_Request Body_

```
  {
    "name": "<product name>",
    "price": "<product price>",
    "stock": "<product stock>",
    "image_url": "<product image url>",
    "status": "<product status>",
    "category": "<product category>"
  }
```

_Response (200 - Ok)_

```
  {
    "id": "<product id generate by server>",
    "name": "<updated product name>",
    "price": "<updated product price>",
    "stock": "<updated product price>",
    "status": "<updated product status>",
    "image_url": "<updated product image url>",
    "category": "<updated product category>"
  }
```

_Response (400 - Bad Request)_

```
  {
    "message": ["Product name is required", "Product image url is required", "Please input image using url format", "Price is required", "Price minimum is 0", "Stock is required", "Stock minimum is 0", "Category is required"]
  }
```

_Response (401 - Unauthorize)_

```
{
  "message": "Please login first"
}
```

_Response (401 - Unauthorize)_

```
  {
    "message": "You are not admin"
  }
```

_Response (500 - Internal server error)_

```
  {
    "message": "Internal server error"
  }
```

### DELETE /products/:id

_Request Header_

```
  {
    "access_token": "<your access_token>"
  }
```

_Request Params_

```
  {
    "id": "<product id>"
  }
```

_Request Body_

```
Not needed
```

_Response (200 - Ok)_

```
  {
    "message": "Product deleted successfully"
  }
```

_Response (401 - Unauthorize)_

```
{
  "message": "Please login first"
}
```

_Response (401 - Unauthorize)_

```
  {
    "message": "Your are not admin"
  }
```

_Response (500 - Internal server error)_

```
  {
    "message": "Internal server error"
  }
```

## CART Documentation

### GET /carts

_Request Header_

```
  {
    "access_token": "<your access token>"
  }
```

_Request Body_

```
Not needed
```

_Response (200 - Ok)_

```
  [
    {
      "id": "<your cart id generate by server>",
      "UserId": "<your user id>",
      "ProductId": "<product id>",
      "quantity": "<your cart quantity>",
      "status": "<your cart status>",
      "Product": {
        "id": "<product id>",
        "name": "<product name>",
        "image_url": "<product image url>",
        "price": "<product price>",
        "stock": "<product stock>",
        "status": "<product status>"
      }
    },{
      "id": "<your cart id generate by server>",
      "UserId": "<your user id>",
      "ProductId": "<product id>",
      "quantity": "<your cart quantity>",
      "status": "<your cart status>",
      "Product": {
        "id": "<product id>",
        "name": "<product name>",
        "image_url": "<product image url>",
        "price": "<product price>",
        "stock": "<product stock>",
        "status": "<product status>"
    }
  ]
```

_Response (401 - Unauthorize)_

```
  {
    "message": "Please login first"
  }
```

_Response (500 - Internal server error)_

```
  {
    "message": "Internal server error"
  }
```

### POST /carts

_Request Header_

```
  {
    "access_token": "<your access token>"
  }
```

_Request Body_

```
  {
    "ProductId": "<product id>",
    "UserId": "<user id>",
    "quantity": "<quantity>",
    "status": "<cart status>",
  }
```

_Response (201 - if-Created)_

```
  {
    "id": "<your cart id generate by server>"
    "ProductId": "<created product id>",
    "UserId": "<your user id>",
    "quantity": "<created quantity>",
    "status": "<created your cart status>",
  }
```

_Response (200 - if-updated)_

```
  {
    "id": "<your cart id generate by server>"
    "ProductId": "< product id>",
    "UserId": "<your user id>",
    "quantity": "<updated quantity>",
    "status": "< your cart status>",
  }
```

_Response (400 - Bad Request)_

```
  {
    "message": "Stock is not enough"
  }
```

_Response (401 - Unauthorize)_

```
  {
    "message": "Please login first"
  }
```

_Response (500 - Internal server error)_

```
  {
    "message": "Internal server error"
  }
```

### PATCH /carts/:id

_Request Header_

```
  {
    "access_token": "<your access token>"
  }
```

_Request Params_

```
  "id": "<cart id>"
```

_Request Body_

```
  {
    "quantity": "<your quantity to update>"
  }
```

_Response (200 - OK)_

```
  {
    "id": "<your cart id generate by server>",
    "UserId": "<your user id>",
    "ProductId": "<product id>",
    "quantity": "<your updated cart quantity>",
    "status": "<your cart status>",
  }
```

_Response (400 - Bad Request)_

```
  {
    "message": "Can't input quantity less than 0"
  }
```

_Response (400 - Bad Request)_

```
  {
    "message": "Stock is not enough"
  }
```

_Response (401 - Unauthorize)_

```
  {
    "message": "Please login first"
  }
```

_Response (500 - Internal server error)_

```
  {
    "message": "Internal server error"
  }
```

### DELETE /carts/:id

_Request Header_

```
  "access_token": "<your access token>"
```

_Request Params_

```
  "id": "<cart id>"
```

_Request Body_

```
Not needed
```

_Response (200 - Ok)_

```
  "message": "Product has been deleted from your cart"
```

_Response (401 - Unauthorize)_

```
  {
    "message": "Please login first"
  }
```

_Response (401 - Unauthorize)_

```
  {
    "message": "You are not customer"
  }
```

_Response (500 - Internal server error)_

```
  {
    "message": "Internal server error"
  }
```

## TRANSACTION Documentation

### GET /transactions

_Request Header_

```
  {
    "access_token": "<your access_token>"
  }
```

_Request Body_

```
  {
    "UserId": "<your user id>",
  }
```

_Response (201 - Created)_

```
  [{
    "id": "<id generate by server>"
    "ProductId": "<product id>",
    "UserId": "<your user id>",
    "quantity": "<quantity to buy>",
    "price": "<total price>",
    "date": "<transaction date>"
  },
  {
    "id": "<id generate by server>"
    "ProductId": "<product id>",
    "UserId": "<your user id>",
    "quantity": "<quantity to buy>",
    "price": "<total price>",
    "date": "<transaction date>"
  }]
```

_Response (401 - Unauthorize)_

```
  {
    "message": "Please login first"
  }
```

_Response (401 - Unauthorize)_

```
  {
    "message": "You are not customer"
  }
```

_Response (500 - Internal server error)_

```
  {
    "message": "Internal server error"
  }
```

### POST /transactions

_Request Header_

```
  {
    "access_token": "<your access_token>"
  }
```

_Request Body_

```
  {
    "UserId": "<your user id>",
    "ProductId": "<product id to checkout>",
    "quantity": "<product quantity to checkout>",
    "price": "<total price>",
    "date": "<transaction date>"
  }
```

_Response (201 - Created)_

```
  {
    "id": "<id generate by server>"
    "ProductId": "<product id>",
    "UserId": "<your user id>",
    "quantity": "<quantity to buy>",
    "price": "<total price>",
    "date": "<transaction date>"
  }
```

_Response (401 - Unauthorize)_

```
  {
    "message": "Please login first"
  }
```

_Response (401 - Unauthorize)_

```
  {
    "message": "You are not customer"
  }
```

_Response (500 - Internal server error)_

```
  {
    "message": "Internal server error"
  }
```
