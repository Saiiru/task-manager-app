package tests

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"task-manager-app/backend/internal/app"
	"task-manager-app/backend/internal/config"
	"task-manager-app/backend/internal/domain"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRegisterRoute(t *testing.T) {
	cfg, err := config.Load()
	assert.NoError(t, err)

	router, err := app.InitializeApp(cfg, true)
	assert.NoError(t, err)

	user := &domain.UserRegister{Email: "test@example.com", Password: "password"}
	body, _ := json.Marshal(user)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/v1/register", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "User registered successfully")
}

func TestRegisterRoute_InvalidData(t *testing.T) {
	cfg, err := config.Load()
	assert.NoError(t, err)

	router, err := app.InitializeApp(cfg, true)
	assert.NoError(t, err)

	user := &domain.UserRegister{Email: "invalid-email", Password: "password"}
	body, _ := json.Marshal(user)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/v1/register", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "Invalid email format")
}

func TestRegisterRoute_MissingData(t *testing.T) {
	cfg, err := config.Load()
	assert.NoError(t, err)

	router, err := app.InitializeApp(cfg, true)
	assert.NoError(t, err)

	user := &domain.UserRegister{Email: "test@example.com"}
	body, _ := json.Marshal(user)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/v1/register", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "Password is required")
}
