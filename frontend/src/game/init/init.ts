// function createCustomButton(title : string, mPressed : any, mOver : any = highlightButton, mOut : any = resetButton, size_x : number = consts.std_width, size_y : number = consts.std_height) {
	function createCustomButton(title : string, mPressed : any, mOver : any, mOut : any, size_x : number, size_y : number) {
	let button = createButton(title);
	button.style("color", "white");
	button.style("font-size", (Math.sqrt(Math.pow(size_x, 2) + Math.pow(size_y, 2)) / 8).toString() + "px");
	button.style("font-family", "PressStart2P-Regular");
	button.style("background-color", "black");
	button.style("border-radius", "1em");
	button.size(size_x, size_y); // 280, 175 default

	button.mousePressed(mPressed);
	button.mouseOver(mOver);
	button.mouseOut(mOut);

	return button;
}

function createCustomInput(title : string) {
	let input = createInput(title);
	input.style("height", (consts.HEIGHT / 10).toString() + "px");
	input.style("font-size", consts.std_font_size.toString() + "px");
	input.style("font-family", "PressStart2P-Regular");
	input.style("background-color", "black");
	input.style("color", "white");
	input.style("border", "3px solid white");
	input.style("border-radius", "0.5em");
	input.style("outline", "none");

	return input;
}
