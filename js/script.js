$(function(){

	var score = 1;
	var lastWhich = 0; // stockage de la dernière touche pressée

	// initialisation des touches Z, Q et D en false
	$("#multitouche").data("e", {
		key81: false,
		key90: false,
		key68: false,
	});

	// tout le code concerné par le pressage des touches est mis là
	$(document).keydown(function(key){

	    var pos = $(".mario").position().left;
	    var offset = $(".mario").offset();
	    var dataKey = $("#multitouche").data("e");

	    // mario prend la pièce
	    if ($(".mario").css('left') == $(".piece").css('left')){
			$(".piece").removeClass();
			$("#score").html(score++);
	    }

	    if ($(".mario").css('left') == $(".piece2").css('left')){
			$(".piece2").removeClass();
			$("#score").html(score++);
	    }

	    // limite de fin de niveau, retour au début
	    if ($(".mario").css('left') == $(".limite").css('left')) {
	    	alert("Fin du niveau");
	    	location.reload(true);
	    }

	    switch(key.which){
	    	
			case 81: // Q gauche
				dataKey.key81 = true; // key81 devient true pour l'utiliser plus tard
				// si mario bouge à gauche et reste dans le cadre il se retourne sinon il s'arrête
				if ((pos > 0) && (pos < 240)){
					$('.mario').css({backgroundPosition: "228px 139px"}).stop().animate({left: "-=5"}, 1);
					break;
				} else { 
					$('.mario').animate();
					break; 
				}

			case 90: // Z haut
				dataKey.key90 = true; // key90 devient true pour l'utiliser plus tard
				// gestion des collisions et score
				if ($(".mario").css("left") == $(".bloc1").css("left")){
					$("#score").html(score++);
					$(".bloc1").removeClass("bloc1", 200, "easeInSine");
				}

				if ($(".mario").css("left") == $(".bloc2").css("left")){
					$("#score").html(score++);
					$(".bloc2").removeClass("bloc2", 200, "easeInSine");						
				}

				if ($(".mario").css("left") == $(".bloc3").css("left")){
					$("#score").html(score++);	
					$(".bloc3").removeClass("bloc3", 200, "easeInSine");					
				}
				break;
					
			case 68: // D droite
			dataKey.key68 = true; // key68 devient true pour l'utiliser plus tard
				// à partir d'une certaine position de mario c'est le fond et les éléments fixes qui bougent à gauche
				if(pos > 149){
					$('#fond').stop().animate({backgroundPosition: "-=5px"},1);
					$('.bloc1').stop().animate({left: "-=5px"},1);
					$('.bloc2').stop().animate({left: "-=5px"},1);
					$('.bloc3').stop().animate({left: "-=5px"},1);
					$('.piece').stop().animate({left: "-=5px"},1);
					$('.piece2').stop().animate({left: "-=5px"},1);
					$('.limite').stop().animate({left: "-=5px"},1);
				} else if ((pos > -10) && (pos < 150)){ // sinon c'est mario qui bouge
					$('.mario').css({backgroundPosition: "198px 139px"}).stop().animate({left: "+=5"}, 1);
				} else { 
					$('.mario').animate();
				}
		}

		// fonction pour faire tomber mario après un saut
		function tombe(){ 
			setTimeout(function(){ 
				$('.mario').animate({top: "+=30"}, 200); 
			});
		}

		// condition de saut, le premier if empêche mario de sauter en boucle jusqu'à sortir du cadre
		if (offset.top >= 380){
			if (dataKey.key90 && dataKey.key81){
				if(pos > 10){
					$('.mario').stop().animate({top: "-=30", left: "-=5"}, 10, tombe());
				} else {
					$('.mario').css({backgroundPosition: "228px 139px"}).stop().animate({top: "-=30"}, 10, tombe());
				}
			} else if (dataKey.key90 && dataKey.key68){
				// condition empêchant mario de sortir du cadre à droite en sautant
				if(pos > 149){
					$('.mario').css({backgroundPosition: "198px 139px"}).stop().animate({top: "-=30"}, 10, tombe());
					$('#fond').stop().animate({backgroundPosition: "-=5px"},10);
					$('.bloc1').stop().animate({left: "-=5px"},1);
					$('.bloc2').stop().animate({left: "-=5px"},1);
					$('.bloc3').stop().animate({left: "-=5px"},1);
					$('.piece').stop().animate({left: "-=5px"},1);
					$('.piece2').stop().animate({left: "-=5px"},1);
					$('.limite').stop().animate({left: "-=5px"},1);
				} else if ((pos > -10) && (pos < 150)){
					$('.mario').css({backgroundPosition: "198px 139px"}).stop().animate({top: "-=30", left: "+=5"}, 10, tombe());
				} else { 
					$('.mario').animate();
				}
			}
		}

 
	});

	// réinitialisation des touches Z, Q et S en false quand la touche est relachée
	$(document).keyup(function(key){
			var dataKey = $("#multitouche").data("e");
 
			switch(key.which){
				case 81:
					dataKey.key81 = false;
					break;
				case 90:
					dataKey.key90 = false;
					break;
				case 68:
					dataKey.key68 = false;
					break;
			}
		});
});