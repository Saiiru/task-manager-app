package interfaces

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func SetupWebSocket() {
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println("Error upgrading connection:", err)
			return
		}
		defer conn.Close()
		for {
			// Exemplo simples de receber e enviar dados via WebSocket
			messageType, p, err := conn.ReadMessage()
			if err != nil {
				log.Println("Error reading message:", err)
				break
			}
			if err := conn.WriteMessage(messageType, p); err != nil {
				log.Println("Error writing message:", err)
				break
			}
		}
	})
	go http.ListenAndServe(":8080", nil)
}
