
class Player {
    constructor(firstName, lastName, mostPoints) {
        this.firstName = firstName;
        this.lastName = lastName;
        mostPoints = []; 
    }
}

class PlayerService {

    static url = 'https://64458d050431e885f0000250.mockapi.io/Username'

    static getAllPlayers() {
        let data = $.get(this.url);
        console.log(data)
        return data
    }//get players from Api's url

    static getPlayer(_id) {
        return data + `/${_id}`;
    }

    static addNewPlayer(player) {
        return $.post(this.url, player)
    }
    
    
    static updatePlayer(player) {
        return $.ajax({
            url: this.url + `/${player}`,
            dataType:'json',
            data: JSON.stringify(player),
            contentType:'application/json',
            type:'PUT'
        });
    }

    static deletePlayer(_id) {
        return $.ajax({
            url: this.url + `/${_id}`,
            type:'DELETE'
        });
    }
}

//DOM
class DOMManager {
    static players;

    static getAllPlayers() {
        PlayerService.getAllPlayers().then(players => this.render(players))
    }

    static addNewPlayer(firstName, lastName) {
        PlayerService.addNewPlayer(new Player(firstName, lastName)).then(() => {
            return PlayerService.getAllPlayers();
        }) .then((players) => this.render(players))
    }

    
    static updatePlayer(_id){
        PlayerService.updatePlayer().then(() => {
            return PlayerService.getAllPlayers();
        }).then((players) => this.render(players));
    }


    static deletePlayer(_id) {
        PlayerService.deletePlayer(_id).then(() => {
            return PlayerService.getAllPlayers();
        }).then((players) => this.render(players));
    }
    

    static render(players) {
        this.players = players
        $('players-list').empty();
        for (let player of players) {
            console.log(players)
            $('#players-list').prepend(
                `  <div id="${player._id}" class="card">
                <div class="card-header">
                    <h2>${player.firstName} ${player.lastName}</h2>
                    <button class="btn btn-danger" onclick="DOMManager.deletePlayer('${player._id}')">Delete</button> 
                    <button class="btn btn-secondary" onclick="DOMManager.updatePlayer('${player._id}')">Update</button>
                </div>
               
                <div class="card-body">
                    <div class="card">
                        <div class="row">
                            <div class="col-sm">

                            </div>
                        </div>
                    </div>
                </div>
            </div> <br>
            `
            )
        }
    }
}

const addPlayerButton = document.getElementById("add-new-player")

addPlayerButton.addEventListener("click", () => {
    DOMManager.addNewPlayer($('#player-first-name').val() , $('#player-last-name').val());
    $('#player-first-name').val(''), $('#player-last-name').val('');
});

DOMManager.getAllPlayers();
         
    