var modelHasLoaded = false;
var model = undefined;
const img2 = document.getElementById('img2');
const input2 = document.getElementById('image2_url');
const inputurl = document.getElementById('image_url');
const result = document.getElementById('prediction');
const urlpic = document.getElementById('urlpic');
const hint = document.getElementById('hint');
const clearpic = document.getElementById('clearpic');

const clearPic = ()=>{
	
	window.location.reload()

}


const urlPic=()=>{
    const inputValue = inputurl.value;
	img2.src = inputValue;
	img2.style.display = 'block';
	clearpic.style.display = "block";
	input2.disabled = true;
    urlpic.disabled = true;
	hint.style.display = "none";

}

image2_url.addEventListener("change", function(){
	const file = this.files[0];

	if(file){
		const reader = new FileReader();

		img2.style.display = "block";
		clearpic.style.display = "block";
		hint.style.display = "none";
		// result.innerText = "Loading...";
		// img.src = null;
		// img.style.display = 'none'
		// input.value = "";
		input2.disabled = true;
		urlpic.disabled = true;


		reader.addEventListener("load", function(){
			img2.setAttribute('src',this.result);
		})

		reader.readAsDataURL(file);
	}else{
		img2.style.display = 'none';
		p.style.display = 'none';
        innerSquare.style.display = 'none';
        

	}
})




cocoSsd.load().then(function (loadedModel) {
	model = loadedModel;
	modelHasLoaded = true;
});

const holderOfImage = document.getElementsByClassName('skyNet');

for (let i = 0; i < holderOfImage.length; i++) {
	holderOfImage[i].children[0].addEventListener('click', handleClick);
}

function handleClick(event) {
	if (!modelHasLoaded) {
		return;
	}

	model.detect(event.target).then(function (predictions) {
		for (let x = 0; x < predictions.length; x++) {
			const p = document.createElement('p');
			p.innerText =
				predictions[x].class +
				' - with ' +
				Math.round(parseFloat(predictions[x].score) * 100) +
				'% confidence.';
			p.style =
				'margin-left: ' +
				predictions[x].bbox[0] +
				'px; margin-top: ' +
				(predictions[x].bbox[1] - 10) +
				'px; width: ' +
				(predictions[x].bbox[2] - 10) +
				'px; top: 0; left: 0;';

			const innerSquare = document.createElement('div');
			innerSquare.setAttribute('class', 'innerSquare');
			innerSquare.style =
				'left: ' +
				predictions[x].bbox[0] +
				'px; top: ' +
				predictions[x].bbox[1] +
				'px; width: ' +
				predictions[x].bbox[2] +
				'px; height: ' +
				predictions[x].bbox[3] +
				'px;';

			event.target.parentNode.appendChild(innerSquare);
			event.target.parentNode.appendChild(p);
		}
	});
}
