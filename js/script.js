function shuffleChildren(parent){ 
// la fonction shuffleChildren() mélange aléatoirement les enfants (les boîtes) d'un élément parent donné (la div#board) 
    let children = parent.children
    let i = children.length, k, temp
    while(--i > 0){ // on boucle tant que 1 est oté de i est toujours positif
        k = Math.floor(Math.random() * (i+1)) // k stocke un nombre aléatoire basé sur i
        temp = children[k] // temp pointe temporairement l'élément à la position k dans board
        children[k] = children[i] // remplace l'élément à la position k par l'élément à la position i
        parent.appendChild(temp) // place l'élément k pointé temporairement à la fin du contenu de board
    }
}

/* Lorsque l'utilisateur provoquera un clic sur une boite, la fonction showReaction() sera appelée 
pour provoquer une réaction visuelle sur cette même boite */
function showReaction(type, clickedBox){
    /* la fonction applique la classe css "type" (error en rouge, success en vert, ou notice en bleu) à la boîte passée en argument */
    clickedBox.classList.add(type) 
    if(type !== "success"){
        /* La fonction setTimeout() permet de retarder l'exécution d'une ou plusieurs instructions */
        setTimeout(function(){
            clickedBox.classList.remove(type)
        }, 800)
    }
}

const box = document.createElement("div") 
/* en appelant la méthode createElement() de l'objet document, un nouvel objet HTMLElement est instancié (ici représenté par "div") */
box.classList.add("box") 
/*  nous modifions sa propriété classList (contenant la liste des classes CSS attribuées à l'élément) 
pour lui ajouter la classe .box (appel de la méthode add() de classList) */

const board = document.querySelector("#board")

let nb = 1 /*  on déclare une variable nb qui représentera le numéro de la boite attendue 
et qui s'incrémentera en cas de clic valide */

let boxes = prompt("Choisissez le nombre de boîtes")
// la méthode prompt() affiche une boîte de dialogue éventuellement avec un message, qui invite l'utilisateur à saisir un texte.

for(let i = 1; i <= boxes; i++){
    const newbox = box.cloneNode() 
    /* la variable newbox aura pour valeur une copie(un clone) de l'élément box grâce à la méthode cloneNode() */
    newbox.innerText = i
    board.appendChild(newbox) 
    /* avec la méthode appendChild() de l'objet document, on place newbox en enfant de la div#board */   

    /* on ajoute un écouteur d'événement au clic d'une boîte */
    newbox.addEventListener("click", function(){
        
        /* 1 si nb est égal au nombre de boîtes du jeu, c'est que le dernier clic était sur la dernière boîte*/
        if(i == nb){ 
            newbox.classList.add("box-valid") /* on ajoute la classe css "box-valid" */
            
            if(nb == board.children.length){
                board.querySelectorAll(".box").forEach(function(box){
                    showReaction("success", box) // la boîte validée sera affichée en mode "success" en vert
                })

                // on crée un bouton rejouer qui apparaît une fois la partie gagnée 
                const replay = document.createElement("button")
                replay.setAttribute("id", "replay")
                replay.innerHTML = "Rejouer" // ajoute du texte dans le bouton
                document.body.appendChild(replay)
                // appendChild permet d'inclure dans un objet plus large un objet enfant
                replay.onclick = () => document.location.reload()
                // document.location désigne l'ensemble du document dans lequel on se trouve
            }
            shuffleChildren(board)
            nb++ // on incrémente nb
        }

        /* 2 si le numéro de la boîte est supérieur à nb, gameover */
        else if(i > nb){
            showReaction("error", newbox) 
            // le joueur verra la boîte en mode "error" en rouge, et toutes les autres boîtes vont se réinitialiser
            nb = 1
            /* lorsque le jeu recommence, on sélectionne les boîtes grisées en passant par l'élément board 
            La méthode querySelectorAll() récupère un tableau d'éléments */
            board.querySelectorAll(".box-valid").forEach(function(validBox){
                validBox.classList.remove("box-valid") 
                /* La fonction callback à l'intérieur de forEach() supprime la classe css "box-valid" 
                des attributs de la boite courante "validBox", reprenant ainsi son aspect initial */
                shuffleChildren(board)
            })
        }

        /* 3 on a cliqué sur une boîte déjà validée */
        else{
            showReaction("notice", newbox) // on appelle la fonction showReaction() en mode "notice" en bleu
            shuffleChildren(board)
        }
    })
}

shuffleChildren(board)