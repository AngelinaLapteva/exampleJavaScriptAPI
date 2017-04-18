// make your namespace
var artApp = {};
var things = {};
artApp.key='p3t2sutH';

artApp.getPieces=function(){
	$.getJSON('https://www.rijksmuseum.nl/api/en/collection/',{
		key:artApp.key,
		format:'json',
		q:things.search,
		ps:things.a
		// function(response) is our callback function because we need first to get our data from api and then run a function, 
		// jquery or any library bring data to function standing next to it
	}, function(response){
		console.log('response',response);
		artApp.dipslayPieces(response.artObjects);
		console.log('response Art Objects =', response)
	});
};



artApp.dipslayPieces=function(data){

	// loop over all the data and create HTML for each piece
	var html=data
	// first we whittle down the list of artworks to those only with webImages
		.filter(function(piece){
			// check if the api even has the webImage and url attributes inside, basically that means: If piece has an attribure webImage and has an attribute webImage url then its true
			if(piece.webImage && piece.webImage.url){
				// if it is false and webImage: null then it filters and remove it from the array, so in this case even if by default you have 10 images, only 9 will show up since for one of it webImage:null
				return true;

			}
		})
		.map(function(piece){
		console.log(piece)
		// for each piece we are loopng over thanks to "map" method, return some HTML
		return `
			<div class="piece">
				<h2>${piece.title}</h2>
				<p class="artist">${piece.principalOrFirstMaker}</p>
				<img src="${piece.webImage.url}" alt="${piece.title}">
			</div>
		`;
		// join will take all the items and join them together
	}).join('');
	$('#artwork').html(html);
}
// th init function is where we listem for the events on page load
artApp.init = function(){
// when someone changes the values from the select dropdown, search for whatever they selected!
	$('#animal').on('change', function(){
		console.log(this.value);
		things.a=10;
		artApp.getPieces(this.value);

	});
	$('.search').on('submit', function(e){
  	//stop the form from submitting!
  	e.preventDefault();
  	things.a=10;
  	things.search =this.searchWord.value
  	artApp.getPieces();
  });


	things.a=10;
	$('.loadMore').on('click', function(){
	 things.a=things.a+10;
	 console.log(things.a);
	 artApp.getPieces();	 
	})

}

// when page loads run artApp.init
artApp.init();