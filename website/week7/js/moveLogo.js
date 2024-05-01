function moveLogo() {
	let container = document.getElementById("logoBox");
	let logo = container.querySelector("img");

	container.addEventListener("keydown", event => {
		doKeyDown(event);
	});

	let x = 0;
	let y = 0;

	function moveLogo(x, y) {
		logo.style.left = x + 'px';
		logo.style.top = y + 'px';
	}

	function doKeyDown(event) {
		switch (event.key) {
			case "a": {
				x = x - 10;
				moveLogo(x, y);
				break;
			}
			case "w": {
				y = y - 10;
				moveLogo(x, y);
				break;
			}
			case "d": {
				x = x + 10;
				moveLogo(x, y);
				break;
			}
			case "s": {
				y = y + 10;
				moveLogo(x, y);
				break;
			}
		}
	}
}
