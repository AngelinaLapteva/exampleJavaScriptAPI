	var artCol={};
	var picsInfo={};


	artCol.getCollections = function() {
        $.getJSON('https://www.rijksmuseum.nl/api/en/collection', {
        	key:artApp.key,
			format:'json',
			q:picsInfo.collection        
      }, function(backWithColl){
      	console.log(backWithColl.artObjects);
      	artCol.dipslayPieces(backWithColl.artObjects)
      });
    }

artCol.dipslayPieces=function(dataTwo){

	// loop over all the data and create HTML for each piece
	var htmlTwo=dataTwo
	// first we whittle down the list of artworks to those only with webImages
		.map(function(pieceCol){
		
		// for each piece we are loopng over thanks to "map" method, return some HTML
		return pieceCol.objectNumber;
console.log(pieceCol)
		// join will take all the items and join them together
	}).join(',');
	
	$('#artwork').html(htmlTwo);
}





artCol.init = function(){
	$('.collections').on('submit', function(b){
		b.preventDefault();
		picsInfo.collection=this.searchCollection.value;
		console.log('collections',picsInfo.collection);
		artCol.getCollections();

	});}

$(function(){
artCol.init();
})