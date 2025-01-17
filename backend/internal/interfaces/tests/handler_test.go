package interfaces

import (
	"net/http"
	"task-manager-app/backend/internal/application"
	"task-manager-app/backend/internal/domain"
	"task-manager-app/backend/pkg/utils"

	"github.com/gin-gonic/gin"
)

// AuthHandler handles authentication-related requests.
type AuthHandler struct {
	userService *application.UserService
	jwtSecret   []byte
}

// NewAuthHandler creates a new AuthHandler.
func NewAuthHandler(userService *application.UserService, jwtSecret []byte) *AuthHandler {
	return &AuthHandler{userService: userService, jwtSecret: jwtSecret}
}

// Register handles user registration.
func (h *AuthHandler) Register(c *gin.Context) {
	var input domain.UserRegister
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": utils.TranslateError(err)})
		return
	}

	if err := h.userService.Register(&domain.User{
		Email:        input.Email,
		PasswordHash: input.Password,
	}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
}
