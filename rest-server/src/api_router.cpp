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

std::string hashSha1(const std::string& str)
{
    SHA1 checksum;
    checksum.update(str);
    return checksum.final();
}

express::Router createApiRouter(database::mariadb::MariaDBClient& db)
{
    express::Router apiRouter;

    // Database example
    apiRouter.get("/users", [&db] APPLICATION(req, res) {
        res.set("Access-Control-Allow-Origin", "*");
        json* usersJson = new json;
        db.query(
            "select email, password_hash, password_salt "
            "from user_account",
            [&req, &res, usersJson](const MYSQL_ROW row) -> void {
                if (row != nullptr) {
                    usersJson->push_back({ { "email", row[0] }, { "password_hash", row[1] }, { "password_salt", row[2] } });
                } else {
                    res.send(usersJson->dump(4));
                    delete usersJson;
                }
            },
            [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                VLOG(0) << "Database error: " << errorString << " : " << errorNumber;
                res.sendStatus(500);
            });
    });

    // Check passsword hash example
    apiRouter.post("/login", [&db] APPLICATION(req, res) {
        res.set("Access-Control-Allow-Origin", "*");
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
                            if (count > 0) {
                                db.query(
                                    "select password_hash, password_salt "
                                    "from user_account "
                                    "where email = '"
                                        + string { body["email"] } + "'",
                                    [&req, &res, &db, &body](const MYSQL_ROW row) -> void {
                                        if (row != nullptr) {
                                            std::string dbPasswordHash { row[0] };
                                            std::string dbPasswordSalt { row[1] };
                                            std::string bodyPassword { body["password"] };
                                            // Check password
                                            if (dbPasswordHash != hashSha1(dbPasswordSalt + bodyPassword)) {
                                                cout << "Sending invalid password error" << endl;
                                                res.status(401).send(json { { "error", "Invalid password" } }.dump(4));
                                            } else {
                                                cout << "Sending successful login" << endl;
                                                res.send(json { { "success", "Successfully logged in" } }.dump(4));
                                            }
                                        }
                                    },
                                    [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                                        VLOG(0) << "Database error: " << errorString << " : " << errorNumber;
                                        res.sendStatus(500);
                                    });
                            } else {
                                res.status(400).send(json { { "error", "Email does not exist" } }.dump(4));
                            }
                        }
                    },
                    [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                        VLOG(0) << "Database error: " << errorString << " : " << errorNumber;
                        res.sendStatus(500);
                    });
            },
            [&res]([[maybe_unused]] const std::string& key) -> void {
                res.sendStatus(500);
            });
    });

    apiRouter.post("/example", [] APPLICATION(req, res) {
        res.set("Access-Control-Allow-Origin", "*");
        req.getAttribute<nlohmann::json>(
            [&res](nlohmann::json& body) -> void {
                // Body is send by the client
                cout << "Client send the json: " << body.dump(4) << endl;
                res.send(json { { "success", "Request was successful" } }.dump(4));
            },
            [&res]([[maybe_unused]] const std::string& key) -> void {
                res.sendStatus(500);
            });
    });

    // JSON as response example
    apiRouter.get("/example", [] APPLICATION(req, res) {
        res.set("Access-Control-Allow-Origin", "*");
        json arrayJson = { { { "email", "alois.dimpfelmoser@polizei.de" } },
            { { "email", "seppl.schubert@gmx.com" } },
            { { "email", "kasperl.schubert@gmx.com" } } };
        // dump(4) = JSON to string with 4 spaces indentation
        res.send(arrayJson.dump(4));
    });
    return apiRouter;
}
