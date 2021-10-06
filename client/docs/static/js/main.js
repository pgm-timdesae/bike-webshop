(() => {
  const app = {
    init () {
      this.cacheElements();
      this.fetchCategories();
      this.registerEventListeners();
    },
  
    cacheElements () {
      this.$nav = document.querySelector('.menu__nav');
      this.$menuIcon = document.querySelector('.ham-icon');
      this.$closeIcon = document.querySelector('.close-icon');
      this.$categoryContainer = document.querySelector('.category-container');
      this.$categories = document.querySelector('.categories-list');
      this.$productsList = document.querySelector('.products-list');
      this.$detailContainer = document.querySelector('.detail-container');   
      this.$cookieContainer = document.querySelector('.cookie-container') ;
      this.$cookieBtn = document.querySelector('.cookie-btn');
      this.$detailContainer = document.querySelector('.detail-container');
      this.$filterBtn = document.querySelector('#filter');
      this.$filterPrice = document.querySelector('#filterPrice');

    },

    registerEventListeners () {
      this.$menuIcon.addEventListener('click', (event) => {
        if(this.$nav.classList.contains('open')){
          this.$nav.classList.remove('open')
        } else {
          this.$nav.classList.add('open');
        }
      });

      this.$closeIcon.addEventListener('click', (event) => {
        if(this.$nav.classList.contains('open')){
          this.$nav.classList.remove('open')
        } else {
          this.$nav.classList.add('open');
        }
      });

      this.$cookieBtn.addEventListener('click', () => {
        this.$cookieContainer.classList.remove('active');
        localStorage.setItem('cookieBanner', true);
      });

      setTimeout(() => {
        if(!localStorage.getItem('cookieBanner'))
        this.$cookieContainer.classList.add('active');
      }, 2000);

      if (this.$filterBtn !== null) { 
        this.$filterBtn.addEventListener('click', () => {
          this.$filterBtn.classList.toggle('open');
        }); 
      }

      if (this.$filterPrice !== null) {
        this.$filterPrice.addEventListener('click', () => {
          this.$filterPrice.classList.toggle('open');
        });
      }
      
    },

    async fetchCategories () {
      webshopApi = new WebshopApi();
      this.cats = await webshopApi.getCategories();

      (this.$categories !== null ? this.generateHTMLCategories(this.cats) : null);
      this.insertHtmlCategoryPage();
    },
  
    generateHTMLCategories (cats) {
      if (this.$categories !== null) {
        this.$categories.innerHTML = cats.map((c) => {
          const catId = c.id;

          return `
            <li class="cat-${c.color}">
              <a href="/bikes?category=${c.name}">
                ${c.name}
              </a>
            </li>
          `
        }).join('');
      }
      this.generateBackgroundColors();
    },

    generateBackgroundColors () {
      Array.from(document.querySelectorAll('.cat-blue')).forEach(el => {
        el.addEventListener('mouseover', () => { 
          document.querySelector('.categories-container').style.backgroundColor = '#88A8DE';
        })})

      Array.from(document.querySelectorAll('.cat-green')).forEach(el => {
        el.addEventListener('mouseover', () => { 
          document.querySelector('.categories-container').style.backgroundColor = '#80B4A1';
        })})

      Array.from(document.querySelectorAll('.cat-brown')).forEach(el => {
        el.addEventListener('mouseover', () => { 
          document.querySelector('.categories-container').style.backgroundColor = '#A38383';
        })})

      Array.from(document.querySelectorAll('.cat-pink')).forEach(el => {
        el.addEventListener('mouseover', () => { 
          document.querySelector('.categories-container').style.backgroundColor = '#F6AB95';
        })
      })
    },
  
    async fetchProductsFromCategory (catId) {
      webshopApi = new WebshopApi();
      this.productsFromCat = await webshopApi.getProductsFromCategory(catId);

      this.generateHtmlForProductsOfCategory(this.productsFromCat);
      this.generateDetailPageForProduct(this.productsFromCat);
    },
  
    insertHtmlCategoryPage () {
      let selectedCategory = this.generatePageForCategory();

      if (selectedCategory !== null) {
        this.cats = this.cats.filter((e) => e.name === selectedCategory);
      }

      // definieer de category id en gebruik deze om te fetchen
      const catId = this.cats.map((e) => e.id)
      this.fetchProductsFromCategory(catId);

      if(this.$categoryContainer !== null) {
        const html = this.cats.map((c) => {
          return `
          <div class="category-container__img">
            <img src="../static/images/${c.image}" />      
            <h2>${c.name} bikes</h2>
          </div>
          <div class="category-container__description ${c.color}">
            <div class="h-layout">
              <p>${c.description}</p>
            </div>
          </div>
          `
        }).join('');

        this.$categoryContainer.innerHTML = html;
      }
    },

    async fetchProducts () {
      webshopApi = new WebshopApi();
      this.product = await webshopApi.getProducts();
      this.generateHTMLForAllProducts(this.product);
      return this.products;
    },
  
    generatePageForCategory () {
      const search = window.location.search;

      const params = new URLSearchParams(search);
      const urlType = params.get('category');
      if (urlType === 'all') {
        this.fetchProducts();
      }
      if (urlType !== null) {
        return params.get('category');
      } else {
      return null;
      } 
    },

    generateHTMLForAllProducts (products) {
      (products)
      const html = products.map((p) =>  {
        return `
        <li class="products-list-item">
          <a href="/detail?name=${p.name}&id=${p.id}" class="product">
            <img class="product__img" src="../static/images/bike.jpg" />
            <h4 class="product__title">${p.name}</h4>
            <span class="product__price">€ ${p.price},00</span>
            <span class="product__color">${p.color}</span>
          </a>     
        </li>
        `
      }).join('');

      this.$productsList.innerHTML = html;
    },
  
    generateHtmlForProductsOfCategory(productsFromCat) {
      if (this.$productsList !== null) {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const url = params.get('category');

        if (url !== 'all') {
          const html = productsFromCat.map((products) => products.Products.map((p) => {
            return `
            <li class="products-list-item">
              <a href="/detail?name=${p.name}&id=${p.id}" class="product">
                <img class="product__img" src="../static/images/bike.jpg" />
                <h4 class="product__title">${p.name}</h4>
                <span class="product__price">€ ${p.price},00</span>
                <span class="product__color">${p.color}</span>
              </a>     
            </li>
            `
          }).join('')).join('');

          this.$productsList.innerHTML = html;
        }
      }
    },

    async fetchProductById (productId) {
      webshopApi = new WebshopApi();
      this.product = await webshopApi.getProductById(productId);
      return this.product;
    },

    async fetchReviewByProductId (productId) {
      webshopApi = new WebshopApi();
      this.review = await webshopApi.getReviewByProductId(productId);
      return this.review;
    },

    async generateDetailPageForProduct () {
      if (this.$detailContainer !== null) {
        // Search for the product id parameters in the url
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const urlId = params.get('id');

        // Fetch the product with the id specified in the query
        webshopApi = new WebshopApi();
        this.product = await webshopApi.getProductById(urlId);
        this.review = await webshopApi.getReviewByProductId(urlId);

        const bike = this.product;
        const review = this.review;

        // Parse json data from db
        const sizes = JSON.parse(bike.size)
        const sizesHtml = sizes.map((size) => {
          return `
          <li>
            <a href="#">
              ${size}
            </a>
          </li>    
          `
        }).join('');

        // Map through the data of reviews
        const reviewHtml = await review.map((r) => {
          return `
          <div class="testimonial">
            <div class="testimonial__content">
                <span class="sign--green">"</span>
                <p>${r.text}</p>
            </div>
            <div class="testimonial__review">
                <div class="testimonial__review__img">
                    <img class="user--green" src="../../static/images/user-1.jpeg" alt="user">
                </div>
                <div class="testimonial__review__info">
                    <span class="user-name">${this.fetchUsernameByUserId(r.userId)}</span>
                    <span class="user-date">${r.createdAt}</span>
                    <div>
                        <i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>
                    </div>
                </div>
            </div>
          </div>
          `
        }).join('')
    
        // Return the html
        const html = await `
          <h2 class="detail-container__title">${bike.name}</h2>
          <div class="detail-container__flex">
            <div class="img">
              <img class="product__img" src="../static/images/bike.jpg" />
            </div>
            <div class="overview">
              <h3>Overview</h3>
              <div class="overview__color">
                <span class="title">Color</span>
                <span class="${bike.color}"></span>
              </div>
              <div class="overview__size">
                <span class="title">Size</span>
                <ul>${sizesHtml}</ul>
              </div>
              <div class="overview__price">
                <span>€ ${bike.price}, 00</span>
                <a class="add-to-cart" href="#">
                  <span>Add to cart</span>
                </a>
              </div>
            </div>
          </div>
          <div class="detail-container__flex">
            <div class="description">
              <h3>Description</h3>
              <div>${bike.description}</div>
            </div>
            <div class="reviews">
              <h3>Reviews</h3>
              <div class="">${reviewHtml}</div>
            </div>
          </div>
        `
        this.$detailContainer.innerHTML = await html;
      }
    },

    async fetchUsernameByUserId (userId) {
      webshopApi = new WebshopApi();
      this.user = await webshopApi.getUserById(userId);
      return this.user.username;
    },
  };
  
  app.init();
})();