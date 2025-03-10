document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("product-form");
    const captureForm = document.getElementById("capture-form");
    const successScreen = document.getElementById("success-screen");
    const captureAnotherBtn = document.getElementById("capture-another");
  
    // Extract product data from the current page and fill all form fields
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
  
      // Set the URL field immediately
      document.getElementById("product-url").value = activeTab.url;
  
      // Execute script in the active tab to extract product information
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          function: extractProductInfo,
        },
        (results) => {
          if (results && results[0] && results[0].result) {
            const productInfo = results[0].result;
  
            // Fill form fields with extracted data
            document.getElementById("product-title").value =
              productInfo.title || "";
            document.getElementById("product-price").value =
              productInfo.price || "";
            document.getElementById("product-image").value =
              productInfo.imageUrl || "";
          }
        }
      );
    });
  
    // Function that will be injected into the page to extract product information
    function extractProductInfo() {
      const productData = {
        title: "",
        price: "",
        imageUrl: "",
      };
  
      // Try to find product title
      const possibleTitleElements = [
        document.querySelector("h1"),
        document.querySelector("meta[property='og:title']"),
        document.querySelector("meta[name='twitter:title']"),
        document.querySelector(".product-title"),
        document.querySelector(".product-name"),
      ];
  
      for (const element of possibleTitleElements) {
        if (element) {
          if (element.tagName === "META") {
            productData.title = element.getAttribute("content");
          } else {
            productData.title = element.textContent.trim();
          }
          if (productData.title) break;
        }
      }
  
      // Try to find product price
      const possiblePriceElements = [
        document.querySelector(".price"),
        document.querySelector(".product-price"),
        document.querySelector("[itemprop='price']"),
        document.querySelector("meta[property='product:price:amount']"),
        // Look for currency symbol followed by numbers
        ...Array.from(document.querySelectorAll("*")).filter(
          (el) =>
            /\$\s*\d+(\.\d{2})?/.test(el.textContent) ||
            /\d+(\.\d{2})?\s*\$/.test(el.textContent)
        ),
      ];
  
      for (const element of possiblePriceElements) {
        if (element) {
          if (element.tagName === "META") {
            productData.price = element.getAttribute("content");
          } else {
            // Extract just the price using regex
            const priceMatch = element.textContent.match(
              /\$\s*\d+(\.\d{2})?|\d+(\.\d{2})?\s*\$/
            );
            if (priceMatch) {
              productData.price = priceMatch[0].trim();
            } else {
              productData.price = element.textContent.trim();
            }
          }
          if (productData.price) break;
        }
      }
  
      // Try to find product image
      const possibleImageElements = [
        document.querySelector("meta[property='og:image']"),
        document.querySelector("meta[name='twitter:image']"),
        document.querySelector(".product-image img"),
        document.querySelector(".main-product-image"),
      ];
  
      for (const element of possibleImageElements) {
        if (element) {
          if (element.tagName === "META") {
            productData.imageUrl = element.getAttribute("content");
          } else if (element.tagName === "IMG") {
            productData.imageUrl = element.getAttribute("src");
          } else {
            const img = element.querySelector("img");
            if (img) {
              productData.imageUrl = img.getAttribute("src");
            }
          }
  
          // Ensure URL is absolute
          if (productData.imageUrl && !productData.imageUrl.startsWith("http")) {
            const base = document.baseURI || window.location.origin;
            productData.imageUrl = new URL(productData.imageUrl, base).href;
          }
  
          if (productData.imageUrl) break;
        }
      }
  
      return productData;
    }
  
    // Handle form submission
    productForm.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      const productData = {
        url: document.getElementById("product-url").value,
        title: document.getElementById("product-title").value,
        price: document.getElementById("product-price").value,
        imageUrl: document.getElementById("product-image").value,
      };
  
      try {
        // Send data to API using async/await
        await sendToAPI(productData);
  
        // Show success screen
        captureForm.classList.add("hidden");
        successScreen.classList.remove("hidden");
      } catch (error) {
        console.error("Error saving product:", error);
        alert("Error saving product. Please try again.");
      }
    });
  
    // Handle "Capture Another" button
    captureAnotherBtn.addEventListener("click", function () {
      successScreen.classList.add("hidden");
      captureForm.classList.remove("hidden");
  
      // Clear form fields except URL
      document.getElementById("product-title").value = "";
      document.getElementById("product-price").value = "";
      document.getElementById("product-image").value = "";
    });
  
    // Function to send data to API using async/await
    async function sendToAPI(data) {
      // Replace with your actual API endpoint
      const apiUrl = "http://localhost:3000/api/v1/products";
  
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      return response.json();
    }
  });