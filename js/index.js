// Đợi cho toàn bộ nội dung của trang được tải xong
document.addEventListener("DOMContentLoaded", function () {
	const cartCount = document.querySelector(".san-pham-trong-ro-hang"); // Phần tử hiển thị số lượng sản phẩm trong giỏ

	// Hàm cập nhật hiển thị số lượng sản phẩm trong giỏ hàng
	function updateCartCountDisplay() {
		const cart = JSON.parse(localStorage.getItem("cart")) || []; // Lấy giỏ hàng từ localStorage, nếu không có thì là mảng rỗng
		const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0); // Tính tổng số lượng sản phẩm
		if (cartCount) {
			cartCount.textContent = totalCount; // Gán số lượng vào phần tử hiển thị
		}
	}

	// Gán sự kiện click cho tất cả nút "Thêm vào giỏ hàng"
	document.querySelectorAll(".add-to-cart").forEach(function (btn) {
		btn.addEventListener("click", function () {
			// Lấy thông tin sản phẩm từ thuộc tính data của nút
			const title = btn.getAttribute("data-title") || "Unknown"; // Tên sản phẩm
			const price = parseFloat(btn.getAttribute("data-price")) || 0; // Giá sản phẩm
			const image = btn.getAttribute("data-image") || ""; // Ảnh sản phẩm

			// Tạo đối tượng sản phẩm mới với số lượng mặc định là 1
			const product = {
				title,
				price,
				image,
				quantity: 1,
			};

			// Lấy giỏ hàng hiện tại từ localStorage
			let cart = JSON.parse(localStorage.getItem("cart")) || [];

			// Kiểm tra xem sản phẩm đã tồn tại trong giỏ hay chưa
			const existingProduct = cart.find((item) => item.title === product.title);
			if (existingProduct) {
				existingProduct.quantity++; // Nếu có rồi thì tăng số lượng lên 1
			} else {
				cart.push(product); // Nếu chưa có thì thêm mới vào giỏ
			}

			// Lưu lại giỏ hàng mới vào localStorage
			localStorage.setItem("cart", JSON.stringify(cart));

			// Cập nhật lại số lượng sản phẩm hiển thị
			updateCartCountDisplay();

			// Chuyển hướng người dùng sang trang giỏ hàng sau 100ms
			setTimeout(() => {
				window.location.href = "cart.html";
			}, 100);
		});
	});

	// Cập nhật hiển thị giỏ hàng ngay khi trang được tải
	updateCartCountDisplay();
});
