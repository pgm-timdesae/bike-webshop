const WEBSHOP_BASE_PATH = 'http://localhost:8081/api';

function WebshopApi() {
  this.getCategories = async () => {
    try {
      const response = await fetch(`${WEBSHOP_BASE_PATH}/categories`);

      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('An error occured!', error)
    }
  }

  this.getProducts = async () => {
    try {
      const response = await fetch(`${WEBSHOP_BASE_PATH}/products`);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('An error occured!', error)
    }
  }

  this.getProductById = async (productId) => {
    try {
      const response = await fetch(`${WEBSHOP_BASE_PATH}/products/${productId}`);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('An error occured!', error)
    }
  }

  this.getUserById = async (userId) => {
    try {
      const response = await fetch(`${WEBSHOP_BASE_PATH}/users/${userId}`);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('An error occured!', error)
    }
  }

  this.getReviewByProductId = async (productId) => {
    try {
      const response = await fetch(`${WEBSHOP_BASE_PATH}/products/${productId}/reviews`);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('An error occured!', error)
    }
  }

  this.getProductsFromCategory = async (catId) => {
    try {
      const response = await fetch(`${WEBSHOP_BASE_PATH}/categories/${catId}/products?`);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('An error occured!', error)
    }
  }
}