from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse as urlparse
from urllib.parse import parse_qs
import json

class Room:
    def __init__(self, code):
        self.code = code
        self.players = []
        self.words = []
        self.playing = False

class Player:
    def __init__(self, name):
        self.name = name
        self.score = -1

INDOOR_MODE = 0
OUTDOOR_MODE = 1
MIXED_MODE = 2
def get_random_words(mode):
    n = 5
    import random
    with open("words0", "r") as f:
        words0 = f.read().split('\n')[:-1]
    with open("words1", "r") as f:
        words1 = f.read().split('\n')[:-1]
    if mode==INDOOR_MODE: words = words0
    elif mode==OUTDOOR_MODE: words = words1
    else: words = words0 + words1
    random.shuffle(words)
    return words[:n]

rooms = []
counter = 13176

class MyHTTPRequestHandler(BaseHTTPRequestHandler):

    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_GET(self):
        params = parse_qs(urlparse.urlparse(self.path).query)
        if 'key' not in params.keys(): return
        key = params['key'][0]
        self._set_headers()

        if key=='newroom':
            name = params['name'][0]
            self.new_room(name)

        if key=='start':
            code = params['code'][0]
            mode = params['mode'][0]
            self.start(int(code),int(mode))

        if key=='getwords':
            code = params['code'][0]
            self.get_words(int(code))

        if key=='getplayers':
            code = params['code'][0]
            self.get_players(int(code))

        if key=='joinroom':
            code = params['code'][0]
            name = params['name'][0]
            self.join_room(int(code),name)

        if key=='sendscore':
            code = params['code'][0]
            name = params['name'][0]
            score = params['score'][0]
            self.send_score(int(code),name,int(score))

        if key=='receiveresults':
            code = params['code'][0]
            self.receive_results(int(code))

    def new_room(self,name):
        global counter
        global rooms
        counter = counter + 1
        code = counter
        room = Room(code)
        room.players.append(Player(name))
        rooms.append(room)
        self.wfile.write(json.dumps({'answer':code}).encode('utf-8'))

    def start(self,code,mode):
        words = []
        for room in rooms:
            if room.code==code:
                if room.playing == True:
                            self.wfile.write(json.dumps({'answer':'error'}).encode('utf-8'))
                            return
                room.words=get_random_words(mode)
                room.playing = True
                self.wfile.write(json.dumps({'answer':'words generated'}).encode('utf-8'))
                return
        self.wfile.write(json.dumps({'answer':'error'}).encode('utf-8'))

    def get_words(self,code):
        words = []
        for room in rooms:
            if room.code==code and room.playing ==True:
                words = room.words
        self.wfile.write(json.dumps({'answer':words}).encode('utf-8'))

    def get_players(self,code):
        names = []
        for room in rooms:
            if room.code==code:
                players = room.players
                for player in players: names.append(player.name)
        self.wfile.write(json.dumps({'answer':names}).encode('utf-8'))

    def join_room(self,code,name):
        words = []
        for room in rooms:
            if room.code==code:
                players = room.players
                for player in players:
                    if player.name==name:
                        self.wfile.write(json.dumps({'answer':'error'}).encode('utf-8'))
                        return
                players.append(Player(name))
                self.wfile.write(json.dumps({'answer':'new player joined'}).encode('utf-8'))

    def send_score(self,code,name,score):
        for room in rooms:
            if room.code==code:
                players = room.players
                for player in players:
                    if player.name==name:
                        player.score=score
                        self.wfile.write(json.dumps({'answer':'score received'}).encode('utf-8'))
                        return
        self.wfile.write(json.dumps({'answer':'error'}).encode('utf-8'))

    def receive_results(self,code):
        results = []
        for room in rooms:
            if room.code==code:
                players = room.players
                for player in players:
                    name = player.name
                    score = player.score
                    if score<0: 
                        self.wfile.write(json.dumps({'answer':'error'}).encode('utf-8'))
                        return
                    results.append([name,score])
        self.wfile.write(json.dumps({'answer':results}).encode('utf-8'))
                        
    
if __name__ == "__main__":
    server_ip = ''
    server_port = 8008
    server_address = (server_ip, server_port)
    server = HTTPServer(server_address, MyHTTPRequestHandler)
    print('Starting httpd on port',server_port)
    server.serve_forever()
