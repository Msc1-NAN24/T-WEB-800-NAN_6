import request from "supertest";
import { app, server } from "./index";

type User = {
	id?: number;
	firstName: string;
	lastName: string;
	email: string;
};

type UserInput = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

type UserUpdateInput = {
	// Propriétés optionnelles
	firstName?: string;
	lastName?: string;
	email?: string;
} & ( // Soit les propriétés 'password' et 'oldPassword' sont absentes
	| {
			password?: never; // La propriété 'password' ne doit jamais être présente
			oldPassword?: never; // La propriété 'oldPassword' ne doit jamais être présente
	  }
	// Soit les propriétés 'password' et 'oldPassword' sont présentes
	| {
			password: string; // La propriété 'password' est obligatoire et doit être de type 'string'
			oldPassword: string; // La propriété 'oldPassword' est obligatoire et doit être de type 'string'
	  }
);

type UserCredentials = {
	email: string;
	password: string;
};

const validPassword = "SecretP@ssword1337";

enum InvalidPasswords {
	TOO_SHORT = "Pw@1",
	NO_NUMBER = "SecretP@ssword",
	NO_LOWERCASE = "SECRETP@SSWORD1337",
	NO_UPPERCASE = "secretp@ssword1337",
	NO_SPECIAL_CHARACTER = "SecretPassword1337",
}

enum UserRole {
	USER = "user",
	ADMIN = "admin",
}

describe("API tests", () => {
	// Replace these with real authentication details or mock the JWT verification process
	const testUserCredentials: UserCredentials = {
		email: "johndoe@example.com",
		password: "Secret123@!",
	};

	const testUser: User = {
		id: 1,
		firstName: "John",
		lastName: "Doe",
		email: "johndoe@example.com",
	};

	const newUserInput: UserInput = {
		firstName: "Jane",
		lastName: "Doe",
		email: "janedoe@example.com",
		password: validPassword,
	};

	const newUser: User = {
		...newUserInput,
	};

	let token = "";
	let adminToken = "";

	beforeAll(async () => {
		// TODO: Create a test user in the database with a set ID
		// TODO: Create a test admin user in the database

		// Login to get a JWT token
		const response = await request(app)
			.post("/api/auth/login")
			.send(testUserCredentials);

		token = response.header.authorization ?? "";
	});

	afterAll(() => {
		server.close();
	});

	describe("Authentification - /auth/login", () => {
		describe("POST [GUEST]", () => {
			test("200 - Requête valide", async () => {
				const credentials: UserCredentials = {
					...testUserCredentials,
				};

				const response = await request(app)
					.post("/api/auth/login")
					.send(credentials);

				expect(response.status).toBe(200);
				expect(response.header).toHaveProperty("authorization");
			});

			test("400 - Requête sans email", async () => {
				const credentials: Omit<UserCredentials, "email"> = {
					password: testUserCredentials.password,
				};

				const response = await request(app)
					.post("/api/auth/login")
					.send(credentials);

				expect(response.status).toBe(400);
			});

			test("400 - Requête sans mot de passe", async () => {
				const credentials: Omit<UserCredentials, "password"> = {
					email: testUserCredentials.email,
				};

				const response = await request(app)
					.post("/api/auth/login")
					.send(credentials);

				expect(response.status).toBe(400);
			});

			test("401 - Mot de passe invalide", async () => {
				const credentials: UserCredentials = {
					email: testUserCredentials.email,
					password: "invalid",
				};

				const response = await request(app)
					.post("/api/auth/login")
					.send(credentials);

				expect(response.status).toBe(401);
			});

			test("401 - Utilisateur introuvable", async () => {
				const credentials: UserCredentials = {
					email: "wrong@email.com",
					password: testUserCredentials.password,
				};

				const response = await request(app)
					.post("/api/auth/login")
					.send(credentials);

				expect(response.status).toBe(401);
			});
		});
	});

	describe("Enregistrement - /auth/register", () => {
		describe("POST [GUEST]", () => {
			beforeEach(async () => {
				// TODO: Delete the test user if it exists
			});

			afterAll(async () => {
				// TODO: Delete the test user
			});

			test("201 - Création d'un nouvel utilisateur", async () => {
				const body: UserInput = {
					...newUserInput,
				};

				const response = await request(app)
					.post("api/auth/register")
					.send(body);

				expect(response.status).toBe(201);
				expect(response.body).toMatchObject({
					id: expect.any(Number),
					...newUser,
				});
			});

			test("400 - Échec de création d'un nouvel utilisateur (email manquant)", async () => {
				const body: Omit<UserInput, "email"> = {
					firstName: newUserInput.firstName,
					lastName: newUserInput.lastName,
					password: newUserInput.password,
				};

				const response = await request(app)
					.post("/api/auth/register")
					.send(body);

				expect(response.status).toBe(400);
			});

			test("400 - Échec de création d'un nouvel utilisateur (mot de passe manquant)", async () => {
				const body: Omit<UserInput, "password"> = {
					firstName: newUserInput.firstName,
					lastName: newUserInput.lastName,
					email: newUserInput.email,
				};

				const response = await request(app)
					.post("/api/auth/register")
					.send(body);

				expect(response.status).toBe(400);
			});

			test("400 - Échec de création d'un nouvel utilisateur (prénom manquant)", async () => {
				const body: Omit<UserInput, "firstName"> = {
					lastName: newUserInput.lastName,
					email: newUserInput.email,
					password: newUserInput.password,
				};

				const response = await request(app)
					.post("/api/auth/register")
					.send(body);

				expect(response.status).toBe(400);
			});

			test("400 - Échec de création d'un nouvel utilisateur (nom manquant)", async () => {
				const body: Omit<UserInput, "lastName"> = {
					firstName: newUserInput.firstName,
					email: newUserInput.email,
					password: newUserInput.password,
				};

				const response = await request(app)
					.post("/api/auth/register")
					.send(body);

				expect(response.status).toBe(400);
			});

			test("400 - Échec de création d'un nouvel utilisateur (email invalide)", async () => {
				const body: UserInput = {
					...newUserInput,
				};

				const response = await request(app)
					.post("/api/auth/register")
					.send(body);

				expect(response.status).toBe(400);
			});

			describe("400 - Échec de création d'un nouvel utilisateur (mot de passe invalide)", () => {
				test("Mot de passe trop court", async () => {
					const body: UserInput = {
						...newUserInput,
						password: InvalidPasswords.TOO_SHORT,
					};

					const response = await request(app)
						.post("/api/auth/register")
						.send(body);

					expect(response.status).toBe(400);
				});

				test("Mot de passe ne contient pas de chiffre", async () => {
					const body: UserInput = {
						...newUserInput,
						password: InvalidPasswords.NO_NUMBER,
					};

					const response = await request(app)
						.post("/api/auth/register")
						.send(body);

					expect(response.status).toBe(400);
				});

				test("Mot de passe ne contient pas de majuscule", async () => {
					const body: UserInput = {
						...newUserInput,
						password: InvalidPasswords.NO_UPPERCASE,
					};

					const response = await request(app)
						.post("/api/auth/register")
						.send(body);

					expect(response.status).toBe(400);
				});

				test("Mot de passe ne contient pas de caractère spécial", async () => {
					const body: UserInput = {
						...newUserInput,
						password: InvalidPasswords.NO_SPECIAL_CHARACTER,
					};

					const response = await request(app)
						.post("/api/auth/register")
						.send(body);

					expect(response.status).toBe(400);
				});
			});

			test("409 - Échec de création d'un nouvel utilisateur (email déjà utilisé)", async () => {
				const body: UserInput = {
					firstName: newUserInput.firstName,
					lastName: newUserInput.lastName,
					email: testUserCredentials.email,
					password: newUserInput.password,
				};

				const response = await request(app)
					.post("/api/auth/register")
					.send(body);

				expect(response.status).toBe(400);
			});
		});
	});

	describe("Utilisateurs - /users", () => {
		describe("GET [ADMIN]", () => {
			test("200 - Obtenir la liste des utilisateurs", async () => {
				const response = await request(app)
					.get("/api/users")
					.set("Authorization", adminToken);

				expect(response.status).toBe(200);
				expect(response.body).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							id: expect.any(Number),
							firstName: expect.any(String),
							lastName: expect.any(String),
							email: expect.any(String),
						}),
					]),
				);
			});

			test("401 - Échec de l'authentification", async () => {
				const response = await request(app).get("/api/users");

				expect(response.status).toBe(401);
			});

			test("403 - Accès refusé", async () => {
				const response = await request(app)
					.get("/api/users")
					.set("Authorization", token);

				expect(response.status).toBe(403);
			});
		});
	});

	describe("Rôles - /users/roles", () => {
		describe("GET [ADMIN]", () => {
			test("200 - Obtenir la liste des rôles", async () => {
				const response = await request(app)
					.get("/api/users/roles")
					.set("Authorization", adminToken);

				expect(response.status).toBe(200);
				expect(response.body).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							id: expect.any(Number),
							name: expect.any(String),
						}),
					]),
				);
			});

			test("401 - Échec de l'authentification (token invalide)", async () => {
				const response = await request(app)
					.get("/api/users/roles")
					.set("Authorization", "invalidtoken");

				expect(response.status).toBe(401);
			});

			test("401 - Échec de l'authentification (token manquant)", async () => {
				const response = await request(app).get("/api/users/roles");

				expect(response.status).toBe(401);
			});

			test("403 - Accès refusé", async () => {
				const response = await request(app)
					.get("/api/users/roles")
					.set("Authorization", token);

				expect(response.status).toBe(403);
			});
		});
	});

	describe("Utilisateurs - /users/{userId}", () => {
		describe("GET [ADMIN]", () => {
			test("200 - Obtenir les informations d'un utilisateur", async () => {
				const response = await request(app)
					.get(`/api/users/${testUser.id}`)
					.set("Authorization", adminToken);

				expect(response.status).toBe(200);
				expect(response.body).toMatchObject(testUser);
			});

			test("401 - Échec d'obtention des informations d'un utilisateur (token invalide)", async () => {
				const response = await request(app)
					.get(`/api/users/${testUser.id}`)
					.set("Authorization", "invalidtoken");

				expect(response.status).toBe(401);
			});

			test("403 - Échec d'obtention des informations d'un utilisateur (utilisateur non admin)", async () => {
				const response = await request(app)
					.get(`/api/users/${testUser.id}`)
					.set("Authorization", token);

				expect(response.status).toBe(403);
			});

			test("404 - Échec d'obtention des informations d'un utilisateur (utilisateur inexistant)", async () => {
				const response = await request(app)
					.get("/api/users/0")
					.set("Authorization", adminToken);

				expect(response.status).toBe(404);
			});
		});

		describe("PATCH [ADMIN]", () => {
			afterEach(async () => {
				// TODO: Reset the user's information
			});

			test("200 - Mise à jour des informations d'un utilisateur", async () => {
				const body: UserUpdateInput = {
					firstName: newUserInput.firstName,
					lastName: newUserInput.lastName,
					email: newUserInput.email,
				};

				const response = await request(app)
					.patch(`/api/users/${testUser.id}`)
					.set("Authorization", adminToken)
					.send(body);

				expect(response.status).toBe(200);
				expect(response.body).toMatchObject({
					id: testUser.id,
					...newUser,
				});
			});

			test("400 - Échec de mise à jour des informations d'un utilisateur (email invalide)", async () => {
				const body: UserUpdateInput = {
					...newUserInput,
					oldPassword: testUserCredentials.password,
					email: "invalidemail",
				};

				const response = await request(app)
					.patch(`/api/users/${testUser.id}`)
					.set("Authorization", adminToken)
					.send(body);

				expect(response.status).toBe(400);
			});

			test("409 - Échec de mise à jour des informations d'un utilisateur (email déjà utilisé)", async () => {
				const body: UserUpdateInput = {
					email: testUser.email,
				};

				const response = await request(app)
					.patch(`/api/users/${testUser.id}`)
					.set("Authorization", adminToken)
					.send(body);

				expect(response.status).toBe(409);
			});
		});

		describe("DELETE [ADMIN]", () => {
			afterEach(async () => {
				// TODO: Recreate the user
			});

			test("204 - Suppression d'un utilisateur", async () => {
				const response = await request(app)
					.delete(`/api/users/${testUser.id}`)
					.set("Authorization", adminToken);

				expect(response.status).toBe(204);
			});

			test("401 - Échec de suppression d'un utilisateur (token invalide)", async () => {
				const response = await request(app)
					.delete(`/api/users/${testUser.id}`)
					.set("Authorization", "invalidtoken");

				expect(response.status).toBe(401);
			});

			test("404 - Échec de suppression d'un utilisateur (utilisateur inexistant)", async () => {
				const response = await request(app)
					.delete(`/api/users/${testUser.id}`)
					.set("Authorization", adminToken);

				expect(response.status).toBe(404);
			});
		});
	});

	describe("Promotion - /users/{userId}/role", () => {
		describe("PATCH [ADMIN]", () => {
			afterEach(async () => {
				// TODO: Reset the user's role
			});

			test("200 - Promotion d'un utilisateur", async () => {
				const response = await request(app)
					.put(`/api/users/${testUser.id}/role`)
					.set("Authorization", adminToken)
					.send({ role: UserRole.ADMIN });

				expect(response.status).toBe(200);
				expect(response.body).toMatchObject({
					id: testUser.id,
					role: UserRole.ADMIN,
				});
			});

			test("400 - Échec de promotion d'un utilisateur (rôle invalide)", async () => {
				const response = await request(app)
					.put(`/api/users/${testUser.id}/role`)
					.set("Authorization", adminToken)
					.send({ role: "invalidrole" });

				expect(response.status).toBe(400);
			});

			test("401 - Échec de promotion d'un utilisateur (token invalide)", async () => {
				const response = await request(app)
					.put(`/api/users/${testUser.id}/role`)
					.set("Authorization", "invalidtoken")
					.send({ role: UserRole.ADMIN });

				expect(response.status).toBe(401);
			});

			test("401 - Échec de promotion d'un utilisateur (token manquant)", async () => {
				const response = await request(app)
					.put(`/api/users/${testUser.id}/role`)
					.send({ role: UserRole.ADMIN });

				expect(response.status).toBe(401);
			});

			test("403 - Échec de promotion d'un utilisateur (utilisateur non admin)", async () => {
				const response = await request(app)
					.put(`/api/users/${testUser.id}/role`)
					.set("Authorization", token)
					.send({ role: UserRole.ADMIN });

				expect(response.status).toBe(403);
			});

			test("404 - Échec de promotion d'un utilisateur (utilisateur inexistant)", async () => {
				const response = await request(app)
					.put(`/api/users/${testUser.id}/role`)
					.set("Authorization", adminToken)
					.send({ role: UserRole.ADMIN });

				expect(response.status).toBe(404);
			});
		});

		describe("DELETE [ADMIN]", () => {
			afterEach(async () => {
				// TODO: Reset the user's role
			});

			test("200 - Dégradation d'un utilisateur", async () => {
				const response = await request(app)
					.delete(`/api/users/${testUser.id}/role`)
					.set("Authorization", adminToken);

				expect(response.status).toBe(200);
				expect(response.body).toMatchObject({
					id: testUser.id,
					role: UserRole.USER,
				});
			});

			test("401 - Échec de dégradation d'un utilisateur (token invalide)", async () => {
				const response = await request(app)
					.delete(`/api/users/${testUser.id}/role`)
					.set("Authorization", "invalidtoken");

				expect(response.status).toBe(401);
			});

			test("404 - Échec de dégradation d'un utilisateur (utilisateur inexistant)", async () => {
				const response = await request(app)
					.delete(`/api/users/${testUser.id}/role`)
					.set("Authorization", adminToken);

				expect(response.status).toBe(404);
			});
		});
	});

	describe("Utilisateur - /users/me", () => {
		describe("GET [USER]", () => {
			test("200 - Obtenir les informations de l'utilisateur connecté", async () => {
				const response = await request(app)
					.get("/api/users/me")
					.set("Authorization", token);

				expect(response.status).toBe(200);
				expect(response.body).toMatchObject(testUser);
			});

			test("401 - Échec d'obtention des informations de l'utilisateur connecté (token invalide)", async () => {
				const response = await request(app)
					.get("/api/users/me")
					.set("Authorization", "invalidtoken");

				expect(response.status).toBe(401);
			});

			test("401 - Échec d'obtention des informations de l'utilisateur connecté (token manquant)", async () => {
				const response = await request(app).get("/api/users/me");

				expect(response.status).toBe(401);
			});
		});

		describe("PATCH [USER]", () => {
			afterEach(async () => {
				// TODO: Reset the user's information
			});

			test("200 - Modifier les informations de l'utilisateur connecté", async () => {
				const body: UserInput = {
					...newUserInput,
				};

				const response = await request(app)
					.patch("/api/users/me")
					.set("Authorization", token)
					.send(body);

				expect(response.status).toBe(200);
				expect(response.body).toMatchObject(body);
			});

			test("400 - Échec de modification des informations de l'utilisateur connecté (email déjà utilisé)", async () => {
				const body: UserInput = {
					...newUserInput,
					email: testUserCredentials.email,
				};

				const response = await request(app)
					.patch("/api/users/me")
					.set("Authorization", token)
					.send(body);

				expect(response.status).toBe(400);
			});

			test("400 - Échec de modification des informations de l'utilisateur connecté (email invalide)", async () => {
				const body: UserInput = {
					...newUserInput,
					email: "invalidemail",
				};

				const response = await request(app)
					.patch("/api/users/me")
					.set("Authorization", token)
					.send(body);

				expect(response.status).toBe(400);
			});

			describe("400 - Échec de modification des informations de l'utilisateur connecté (mot de passe invalide)", () => {
				test("Mot de passe trop court", async () => {
					const body: UserUpdateInput = {
						password: InvalidPasswords.TOO_SHORT,
						oldPassword: testUserCredentials.password,
					};

					const response = await request(app)
						.patch("/api/users/me")
						.set("Authorization", token)
						.send(body);

					expect(response.status).toBe(400);
				});

				test("Mot de passe ne contient pas de chiffre", async () => {
					const body: UserUpdateInput = {
						password: InvalidPasswords.NO_NUMBER,
						oldPassword: testUserCredentials.password,
					};

					const response = await request(app)
						.patch("/api/users/me")
						.set("Authorization", token)
						.send(body);

					expect(response.status).toBe(400);
				});

				test("Mot de passe ne contient pas de majuscule", async () => {
					const body: UserUpdateInput = {
						password: InvalidPasswords.NO_UPPERCASE,
						oldPassword: testUserCredentials.password,
					};

					const response = await request(app)
						.patch("/api/users/me")
						.set("Authorization", token)
						.send(body);

					expect(response.status).toBe(400);
				});

				test("Mot de passe ne contient pas de caractère spécial", async () => {
					const body: UserUpdateInput = {
						password: InvalidPasswords.NO_SPECIAL_CHARACTER,
						oldPassword: testUserCredentials.password,
					};

					const response = await request(app)
						.patch("/api/users/me")
						.set("Authorization", token)
						.send(body);

					expect(response.status).toBe(400);
				});
			});

			test("400 - Échec de modification des informations de l'utilisateur connecté (ancien mot de passe manquant)", async () => {
				const body: Omit<UserUpdateInput, "oldPassword"> = {
					password: newUserInput.password,
				};

				const response = await request(app)
					.patch("/api/users/me")
					.set("Authorization", token)
					.send(body);

				expect(response.status).toBe(400);
			});

			test("401 - Échec de modification des informations de l'utilisateur connecté (token invalide)", async () => {
				const body: UserInput = {
					...newUserInput,
				};

				const response = await request(app)
					.patch("/api/users/me")
					.set("Authorization", "invalidtoken")
					.send(body);

				expect(response.status).toBe(401);
			});

			test("401 - Échec de modification des informations de l'utilisateur connecté (token manquant)", async () => {
				const body: UserInput = {
					...newUserInput,
				};

				const response = await request(app).patch("/api/users/me").send(body);

				expect(response.status).toBe(401);
			});

			test("401 - Échec de modification des informations de l'utilisateur connecté (ancien mot de passe invalide)", async () => {
				const body: UserUpdateInput = {
					password: newUserInput.password,
					oldPassword: "invalidpassword",
				};

				const response = await request(app)
					.patch("/api/users/me")
					.set("Authorization", token)
					.send(body);

				expect(response.status).toBe(401);
			});

			test("409 - Échec de modification des informations de l'utilisateur connecté (email déjà utilisé)", async () => {
				const body: UserInput = {
					...newUserInput,
					email: testUserCredentials.email,
				};

				const response = await request(app)
					.patch("/api/users/me")
					.set("Authorization", token)
					.send(body);

				expect(response.status).toBe(400);
			});
		});

		describe("DELETE [USER]", () => {
			beforeEach(async () => {
				// TODO: Recreate the user
			});

			test("204 - Suppression de l'utilisateur connecté", async () => {
				const response = await request(app)
					.delete("/api/users/me")
					.set("Authorization", token);

				expect(response.status).toBe(204);
			});

			test("401 - Échec de suppression de l'utilisateur connecté (token invalide)", async () => {
				const response = await request(app)
					.delete("/api/users/me")
					.set("Authorization", "invalidtoken");

				expect(response.status).toBe(401);
			});

			test("401 - Échec de suppression de l'utilisateur connecté (token manquant)", async () => {
				const response = await request(app).delete("/api/users/me");

				expect(response.status).toBe(401);
			});
		});
	});
});
