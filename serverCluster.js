
// Demo for unsupervised Machine Learning - K-Means Clustering  (for more Info: http://joonku.com/project/machine_learning/apidoc#k_means )
// Clustering of music fans
var ml = require('machine_learning');
 
// Columns: Dataset of user: 0 stands for "Not listened" ; 1 stands for "listened" 
var data = [
// Red Hot Chilli Peppers, 	Justin Bieber, System of a down, 		Eminem, 		David Guetta,	 WuTangClan,		Lady Gaga, 		Daft Punk
	[1,							0,					1,					0,				0,				0,					0,			0], // User 0(Rock)
	[1,							0,					1,					1,				0,				1,					0,			0],	// User 1 (Rock & Hip Hop)
	[0,							0,					0,					1,				0,				1,					0,			0], // User 2 (Hip Hop)
	[0,							0,					0,					0,				1,				0,					0,			1], // User 3 (Electro)
	[0,							1,					0,					0,				1,				0,					1,			1], // User 4 (Electro & Pop)
	[0,							1,					0,					0,				0,				0,					1,			0], // User 5 (Pop)
	];
	
 
var result = ml.kmeans.cluster({
    data : data,
    k : 2,		//Number Groups
    epochs:20, // Numper epochs
    distance : {type : "pearson"} //  alternative : {type : 'euclidean'} 
  
});
 
console.log("Clustered Datasets: ", result.clusters);
