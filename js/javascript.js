(function($) {
    "use strict";
  
    // Cache DOM elements
    const elements = {
      menuToggle: '.menu-toggle a',
      responsiveNav: '#responsive-nav',
      cartDropdown: '.cart-dropdown',
      productSliders: '.products-slick',
      widgetSliders: '.products-widget-slick',
      mainImgSlider: '#product-main-img',
      thumbnailSlider: '#product-imgs'
    };
  
    // Initialize all functionality
    function init() {
      setupMobileNav();
      setupCartDropdown();
      setupProductSliders();
      setupImageZoom();
      setupQuantityInputs();
      setupPriceSlider();
    }
  
    // Mobile Navigation
    function setupMobileNav() {
      const toggle = document.querySelector(elements.menuToggle);
      const nav = document.querySelector(elements.responsiveNav);
  
      if (toggle && nav) {
        toggle.addEventListener('click', function(e) {
          e.preventDefault();
          nav.classList.toggle('active');
          this.setAttribute('aria-expanded', 
            this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
        });
      }
    }
  
    // Cart Dropdown
    function setupCartDropdown() {
      document.addEventListener('click', function(e) {
        const dropdowns = document.querySelectorAll(elements.cartDropdown);
        
        dropdowns.forEach(dropdown => {
          if (!dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
          }
        });
      });
  
      $(elements.cartDropdown).on('click', function(e) {
        e.stopPropagation();
      });
    }
  
    // Product Sliders
    function setupProductSliders() {
      if (typeof $.fn.slick === 'undefined') return;
  
      // Main product sliders
      $(elements.productSliders).each(function() {
        const $this = $(this);
        const $nav = $this.data('nav');
  
        $this.slick({
          slidesToShow: 4,
          responsive: [
            { breakpoint: 991, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } }
          ]
        });
      });
  
      // Product image sliders
      if ($(elements.mainImgSlider).length) {
        $(elements.mainImgSlider).slick({
          fade: true,
          asNavFor: elements.thumbnailSlider
        });
  
        $(elements.thumbnailSlider).slick({
          vertical: true,
          asNavFor: elements.mainImgSlider,
          focusOnSelect: true
        });
      }
    }
  
    // Image Zoom
    function setupImageZoom() {
      const zoomElement = document.getElementById('product-main-img');
      if (zoomElement && typeof $.fn.zoom !== 'undefined') {
        $('#product-main-img .product-preview').zoom();
      }
    }
  
    // Quantity Inputs
    function setupQuantityInputs() {
      $('.input-number').each(function() {
        const $this = $(this);
        const $input = $this.find('input[type="number"]');
        const min = parseInt($input.attr('min')) || 1;
        
        $this.find('.qty-up').on('click', function() {
          $input.val(parseInt($input.val()) + 1).change();
        });
        
        $this.find('.qty-down').on('click', function() {
          const newVal = Math.max(min, parseInt($input.val()) - 1);
          $input.val(newVal).change();
        });
      });
    }
  
    // Price Slider
    function setupPriceSlider() {
      const priceSlider = document.getElementById('price-slider');
      if (!priceSlider || typeof noUiSlider === 'undefined') return;
  
      noUiSlider.create(priceSlider, {
        start: [1, 999],
        connect: true,
        range: { 'min': 1, 'max': 999 }
      });
  
      priceSlider.noUiSlider.on('update', function(values) {
        document.getElementById('price-min').value = values[0];
        document.getElementById('price-max').value = values[1];
      });
    }
  
    // Initialize when ready
    $(document).ready(init);
  
  })(jQuery);