package interfaces

import (
	"task-manager-app/backend/internal/domain"

	"github.com/graphql-go/graphql"
)

func SetupGraphQL() {
	// Definição do Schema GraphQL
	taskType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Task",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.Int,
			},
			"title": &graphql.Field{
				Type: graphql.String,
			},
			"status": &graphql.Field{
				Type: graphql.String,
			},
		},
	})

	// Criando o Schema
	fields := graphql.Fields{
		"task": &graphql.Field{
			Type: taskType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				// Resolver para retornar a tarefa
				return domain.Task{}, nil
			},
		},
	}

	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query: graphql.NewObject(graphql.ObjectConfig{
			Name:   "RootQuery",
			Fields: fields,
		}),
	})

	if err != nil {
		panic(err)
	}

	// Exemplo de como utilizar o Schema com uma query HTTP
	// Aqui você precisaria configurar um servidor HTTP para responder a requisições GraphQL

	_ = schema // Use the schema variable to avoid the declared and not used error
}
