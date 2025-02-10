package storage

import (
	"errors"
)

var (
	// ErrURLNotFound отвечает за ошибку пути к бд
	ErrURLNotFound = errors.New("url not found")
	// ErrURLExist отвечает за ошибку не существование пути
	ErrURLExist = errors.New("url exist")
)
