var path='http://192.168.1.43:8008/'

export async function request(url) {
    let answer = await fetch(url)
    .then((response) => response.json())
    .then((json) => {
      return json.answer
    })
    .catch((error) => {
      console.error(error);
    });
    return answer
}

/*
* Adds a new room to the database generating a new room code
* name: name of the user that creates the room
* Returns the code of the new room
*/
export async function new_room(name) {
    return request(path+'?key=newroom&name='+name)
}

/*
* Generates the words (depending on the mode) and lets the game begin (every user in the room have access to the words)
* code: room code of the game that is starting
* mode: indoor mode (0), outdoor mode(1) or mixed mode(2)
* Returns 'error' if an error occurs 
*/
export async function start(code, mode) {
    return request(path+'?key=start&code='+code+'&mode='+mode)
}

/*
* Get the words of the game. It only works if the game has started
* code: room code of the game
* Returns [] if an error occurs 
*/
export async function get_words(code) {
    return request(path+'?key=getwords&code='+code)
}

/*
* Get the players of the game
* code: room code of the game
* Returns an array with the names of the players
*/
export async function get_players(code) {
    return request(path+'?key=getplayers&code='+code)
}

/*
* Adds a new player to the room
* code: code of the room to me modified
* name: name of the user that joins the room
* Returns 'error' if an error occurs 
*/
export async function join_room(code, name) {
    return request(path+'?key=joinroom&code='+code+'&name='+name)
}

/*
* Sends the score of a player to the server
* code: code of the room where the user was playing
* name: player name
* score: player score
* Returns 'error' if an error occurs 
*/
export async function send_score(code, name, score) {
    return request(path+'?key=sendscore&code='+code+'&name='+name+'&score='+score)
}

/*
* Ask the server for the game results. It only works if all the players in the room have sent their scores
* code: room code of the game
* Returns 'error' if an error occurs (or if there is a player that has not sent his score)
*/
export async function receive_results(code) {
    return request(path+'?key=receiveresults&code='+code)
}
