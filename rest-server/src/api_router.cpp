#include "api_router.h"
#include <express/legacy/in/WebApp.h>
#include <express/middleware/JsonMiddleware.h>
#include <express/middleware/StaticMiddleware.h>
#include <express/middleware/VHost.h>
#include <fstream>
#include <iostream>
#include <nlohmann/json.hpp>
#include <utils/sha1.h>

using namespace std;
using namespace nlohmann;

express::Router createApiRouter(database::mariadb::MariaDBClient& db)
{
    express::Router apiRouter;

    apiRouter.use([] MIDDLEWARE(req, res, next) {
        res.set("Content-Type", "application/json");
        next();
    });

    // Example: Access JSON from request body
    apiRouter.post("/example", [] APPLICATION(req, res) {
        req.getAttribute<nlohmann::json>(
            [&res](nlohmann::json& body) -> void {
                // Body is send by the client
                VLOG(0) << "Client send the json: " << body.dump(4);
                res.send(json { { "success", "Request was successful" } }.dump(4));
            },
            [&res]([[maybe_unused]] const std::string& key) -> void {
                res.sendStatus(500);
            });
    });

    // Example: JSON as response
    apiRouter.get("/example", [] APPLICATION(req, res) {
        json arrayJson = { { { "email", "alois.dimpfelmoser@polizei.de" } },
            { { "email", "seppl.schubert@gmx.com" } },
            { { "email", "kasperl.schubert@gmx.com" } } };
        // dump(4) = JSON to string with 4 spaces indentation
        res.send(arrayJson.dump(4));
    });

    // Example: Database
    apiRouter.get("/users", [&db] APPLICATION(req, res) {
        json* usersJson = new json;
        db.query(
            "select uuid, username, email, color_hex, created_at "
            "from user_account",
            [&res, usersJson](const MYSQL_ROW row) -> void {
                if (row != nullptr) {
                    usersJson->push_back({ { "uuid", row[0] }, { "username", row[1] }, { "email", row[2] }, { "color_hex", row[3] }, { "created_at", row[4] } });
                } else {
                    res.send(usersJson->dump(4));
                    delete usersJson;
                }
            },
            [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                handleDbError(res, errorString, errorNumber);
            });
    });

    // Example: Check user passsword
    apiRouter.post("/login", [&db] APPLICATION(req, res) {
        req.getAttribute<nlohmann::json>(
            [&req, &res, &db](nlohmann::json& body) -> void {
                db.query(
                    "select count(*) "
                    "from user_account "
                    "where email = '"
                        + string { body["email"] } + "'",
                    [&req, &res, &db, &body](const MYSQL_ROW row) -> void {
                        if (row != nullptr) {
                            int count { stoi(row[0]) };
                            if (count == 1) {
                                db.query(
                                    "select password_hash, password_salt "
                                    "from user_account "
                                    "where email = '"
                                        + string { body["email"] } + "'",
                                    [&res, &body](const MYSQL_ROW row) -> void {
                                        if (row != nullptr) {
                                            std::string dbPasswordHash { row[0] };
                                            std::string dbPasswordSalt { row[1] };
                                            std::string bodyPassword { body["password"] };
                                            // Check password
                                            if (dbPasswordHash == hashSha1(dbPasswordSalt + bodyPassword)) {
                                                VLOG(0) << "Sending successful login";
                                                res.send(json { { "success", "Successfully logged in" } }.dump(4));
                                            } else {
                                                VLOG(0) << "Sending invalid password error";
                                                res.status(401).send(json { { "error", "Invalid password" } }.dump(4));
                                            }
                                        }
                                    },
                                    [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                                        handleDbError(res, errorString, errorNumber);
                                    });
                            } else {
                                VLOG(0) << "No user exists with the email '" << body["email"] << "'";
                                res.status(404).send(json { { "error", "Email does not exist" } }.dump(4));
                            }
                        }
                    },
                    [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                        handleDbError(res, errorString, errorNumber);
                    });
            },
            [&res]([[maybe_unused]] const std::string& key) -> void {
                res.sendStatus(500);
            });
    });

    return apiRouter;
}

std::string hashSha1(const std::string& str)
{
    SHA1 checksum;
    checksum.update(str);
    return checksum.final();
}

void handleDbError(express::Response& res, const std::string& errorString, unsigned int errorNumber)
{
    VLOG(0) << "Database error: " << errorString << " : " << errorNumber;
    res.sendStatus(500);
}
