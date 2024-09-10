import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="products"
export default class extends Controller {
  static values = { size: String, product: Object }
  static targets = ["imagePanel", "price"]

  switchImage(event) {
    const selectedIndex = event.currentTarget.dataset.productsIndexParam

    this.imagePanelTargets.forEach((panel, index) => {
      panel.classList.toggle("hidden", index != selectedIndex)
    })
  }

  toggleSize(event) {
    this.sizeValue = event.target.value;
    console.log(this.priceTarget);

    // Check if priceTarget is defined before trying to access it
    if (this.priceTarget) {
      this.priceTarget.innerText = this.formatCurrency(event.target.selectedOptions[0].dataset.price);
    } else {
      console.error("Price target is not defined.");
    }

    console.log("Selected size:", this.sizeValue, "Price:", event.target.selectedOptions[0].dataset.price);
  }

  formatCurrency(price) {
    const unit = "€";
    const separator = ",";
    const delimiter = ".";

    // Convert price to a float value and format to two decimal places
    let number = (price / 100.0).toFixed(2);

    // Split the number into integer and decimal parts
    let [integerPart, decimalPart] = number.split(".");

    // Add thousands delimiter
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);

    // Combine integer part and decimal part with separator
    return `${integerPart}${separator}${decimalPart} ${unit}`;
  }

  addToCart() {
    const cart = localStorage.getItem("cart")
    if (cart) {
      const cartArray = JSON.parse(cart)
      const foundIndex = cartArray.findIndex(item => item.id === this.productValue.id && item.size === this.sizeValue)
      if (foundIndex >= 0) {
        cartArray[foundIndex].quantity = parseInt(cartArray[foundIndex].quantity) + 1
      } else {
        cartArray.push({
          id: this.productValue.id,
          name: this.productValue.name,
          price: this.productValue.price,
          size: this.sizeValue,
          quantity: 1
        })
      }
      localStorage.setItem("cart", JSON.stringify(cartArray))
    } else {
      const cartArray = []
      cartArray.push({
        id: this.productValue.id,
        name: this.productValue.name,
        price: this.productValue.price,
        size: this.sizeValue,
        quantity: 1
      })
      localStorage.setItem("cart", JSON.stringify(cartArray))
    }

    this.showNotice('Product added to cart');
  }

  showNotice(message) {
    const flashNoticeEvent = new CustomEvent('flash:notice', { detail: { message } });
    window.dispatchEvent(flashNoticeEvent);
  }
}
