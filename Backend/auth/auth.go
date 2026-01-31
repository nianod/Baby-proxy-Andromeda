package auth

import (
	"log" //loggin
	"errros" //Error handli
	"firebase.google.com/go/v4/auth" //Firebase admin auth SDK
	"github.com/google/iudd"	//JWT
	"github.com/jinzu/gorm"  //ORM operations
	"golang.org/x/crypto/bcrypt" //password hashing
	"context" //Request errors and cancellation
)

type User struct{
	ID			string `json:"id"`
	Email		string `json:"email"`
	Password 	string `json:"password"`
}

//provide auth services
type AuthService struct{
	DB		 *gorm.DB
	FireAuth *auth.Client
}