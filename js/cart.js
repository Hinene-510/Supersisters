// Đợi cho toàn bộ nội dung của trang được tải xong trước khi thực thi
document.addEventListener("DOMContentLoaded", function () {
	// Lấy các phần tử DOM cần thao tác
	const cartContainer = document.querySelector(".cart-items"); // Nơi hiển thị danh sách sản phẩm trong giỏ
	const totalPriceElement = document.querySelector(".total-price .text-right"); // Hiển thị tổng giá tiền
	const cartCount = document.querySelector(".san-pham-trong-ro-hang"); // Hiển thị số lượng sản phẩm trong giỏ (ví dụ icon giỏ hàng trên header)
	const cartSection = document.querySelector(".col.cart"); // Phần tử chứa toàn bộ giỏ hàng
	const thanksSection = document.querySelector(".col.thanks"); // Phần tử hiển thị thông báo cảm ơn sau khi checkout
	const checkoutButton = document.getElementById("checkout-btn"); // Nút thanh toán

	// Lấy giỏ hàng từ localStorage, nếu không có thì là mảng rỗng
	let cart = JSON.parse(localStorage.getItem("cart")) || [];

	// Hàm cập nhật số lượng sản phẩm hiển thị trên giao diện
	function updateCartCountDisplay() {
		const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0); // Tính tổng số lượng
		if (cartCount) {
			cartCount.textContent = totalCount;
		}
	}

	// Hàm cập nhật giao diện hiển thị giỏ hàng
	function updateCart() {
		cartContainer.innerHTML = ""; // Xóa sạch giao diện cũ

		// Nếu giỏ hàng rỗng, hiển thị thông báo
		if (cart.length === 0) {
			cartContainer.innerHTML = `<p class="empty-cart-message text-center">Your cart is currently empty.</p>`;
			totalPriceElement.textContent = "$0.00"; // Tổng tiền là 0
			updateCartCountDisplay(); // Cập nhật lại hiển thị số lượng
			localStorage.setItem("cart", JSON.stringify(cart)); // Lưu lại giỏ hàng (rỗng)
			return;
		}

		let total = 0; // Biến lưu tổng tiền

		// Duyệt qua từng sản phẩm trong giỏ và tạo phần tử giao diện tương ứng
		cart.forEach((item, index) => {
			const productDiv = document.createElement("div");
			productDiv.classList.add("product");

			const itemTotal = item.price * item.quantity; // Thành tiền từng sản phẩm
			total += itemTotal; // Cộng vào tổng tiền

			// Tạo HTML hiển thị sản phẩm
			productDiv.innerHTML = `
				<img src="${item.image}" alt="${item.title}" class="product-image" />
				<div class="name-product">${item.title}</div>
				<div class="quantity">
					<div class="quantity-control">
						<button class="btn-qty minus" data-index="${index}">-</button>
						<span class="qty-value">${item.quantity}</span>
						<button class="btn-qty plus" data-index="${index}">+</button>
					</div>
				</div>
				<div class="price-product single-price">$${item.price.toFixed(2)}</div>
			`;

			cartContainer.appendChild(productDiv); // Thêm vào giao diện
		});

		// Cập nhật tổng tiền trên giao diện
		totalPriceElement.textContent = `$${total.toFixed(2)}`;

		// Gắn sự kiện cho các nút tăng/giảm số lượng
		bindQuantityButtons();

		// Cập nhật lại số lượng sản phẩm và lưu giỏ hàng
		updateCartCountDisplay();
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	// Hàm xử lý khi người dùng nhấn nút "+" hoặc "-"
	function bindQuantityButtons() {
		document.querySelectorAll(".btn-qty").forEach((btn) => {
			const index = parseInt(btn.dataset.index); // Lấy chỉ số sản phẩm từ thuộc tính data-index

			btn.addEventListener("click", () => {
				if (btn.classList.contains("plus")) {
					// Nếu là nút tăng số lượng
					cart[index].quantity++;
				} else if (btn.classList.contains("minus")) {
					// Nếu là nút giảm số lượng
					cart[index].quantity--;
					// Nếu số lượng về 0 hoặc nhỏ hơn, thì xóa sản phẩm khỏi giỏ
					if (cart[index].quantity <= 0) {
						cart.splice(index, 1);
					}
				}
				updateCart(); // Cập nhật lại giao diện sau khi thay đổi
			});
		});
	}

	// Gắn sự kiện cho nút thanh toán
	if (checkoutButton) {
		checkoutButton.addEventListener("click", function () {
			// Ẩn phần giao diện giỏ hàng
			if (cartSection) cartSection.style.display = "none";
			// Hiện phần cảm ơn
			if (thanksSection) thanksSection.style.display = "flex";

			// Xóa toàn bộ dữ liệu giỏ hàng
			localStorage.removeItem("cart");

			// Cập nhật số lượng sản phẩm hiển thị về 0
			if (cartCount) cartCount.textContent = "0";
		});
	}

	// Gọi cập nhật giao diện giỏ hàng ngay khi trang vừa được tải
	updateCart();
});
