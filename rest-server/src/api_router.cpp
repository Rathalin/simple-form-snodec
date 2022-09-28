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

    // Example: JSON as response
    apiRouter.get("/example", [] APPLICATION(req, res) {
        json arrayJson = { { { "email", "alois.dimpfelmoser@polizei.de" } },
            { { "email", "seppl.schubert@gmx.com" } },
            { { "email", "kasperl.schubert@gmx.com" } } };
        // dump(4) = JSON to string with 4 spaces indentation
        res.send(arrayJson.dump(4));
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

    

    // Database View GET all topics + users
    apiRouter.get("/topic", [&db] APPLICATION(req, res) {
        json* topicsJson = new json;
        db.query(
            "select * from view_topics",
            [&res, topcisJson](const MYSQL_ROW row) -> void {
                if (row != nullptr) {
                   topicsJson->push_back({ { "uuid", row[0] },
                        { "title", row[1] },
                        { "description", row[2] },
                        { "created_at", row[3] },
                        { "user", { { "uuid", row[4] }, { "username", row[5] } } } });
                } else {
                    res.send(topicsJson->dump(4));
                    delete topcisJson;
                }
            },
            [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                handleDbError(res, errorString, errorNumber);
            });
    });

    // get topic and its threads 
    apiRouter.get("/topic/:uuid", [&db] APPLICATION(req, res) {
        json* threadsJson = new json; // contains found threads
        json* topicJson = new json; // contains found topic
        json* topicThreads = new json; // contains topic and its threads 
        db.query(
            // req.query.uuid for uuid value
            "select * from view_topics " 
            "where uuid = '"
                        + string { req.query.uuid } + "'",
            [&res, topicJson](const MYSQL_ROW row) -> void {
                if (row != nullptr) {
                   int topicId {stoi(row[0])}; // topic Id
                   topicJson{ { "uuid", row[1] },
                        { "title", row[3] },
                        { "description", row[4] },
                        { "created_at", row[4] },
                        { "user", { { "uuid", row[4] }, { "username", row[5] } } };

                } else {
                    db.query(
                    "select * from view_threads " 
                    "where thread_topic_id = '"
                                + string { topicId } + "'",
                    [&res, threadsJson](const MYSQL_ROW row) -> void {
                        if (row != nullptr) {
                        int topicId {stoi(row[0])}; // topic Id
                        threadsJson->push_back( "threads", [{ { "uuid", row[1] },
                                { "title", row[2] },
                                { "created_at", row[3] },
                                { "user", { { "uuid", row[6] }, { "username", row[7] } } }]);

                        } else {
                            
                            topicThreads{topicJson, threadsJson};
                            res.status(200).send(topicThreads->dump(4));
                            delete threadsJson;
                            delete topicJson;
                            delete topicThreads;
                        }
                    },
                    [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                        handleDbError(res, errorString, errorNumber);
                    });
                }
            },
            [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                handleDbError(res, errorString, errorNumber);
            });
    });

      apiRouter.get("/thread/:uuid", [&db] APPLICATION(req, res) {
        json* threadJson = new json; // contains found thread
        json* commentsJson = new json; // contains found comments
        json* threadComments = new json; // contains thread and its comments 
        json* topicJson = new json; // contains topic

        db.query(
            // req.query.uuid for uuid value
            "select * from view_threads " 
            "where uuid = '"
                        + string { req.query.uuid } + "'",
            [&res, threadJson](const MYSQL_ROW row) -> void {
                if (row != nullptr) {
                   int threadId {stoi(row[0])}; // thread Id
                   int topicId {stoi(row[4])} // topic Id
                  threadJson{ { "uuid", row[1] },
                        { "title", row[2] },
                        { "created_at", row[3] },
                        { "user", { { "uuid", row[6] }, { "username", row[7] } } };

                } else {
                      db.query(
            // req.query.uuid for uuid value
            "select * from topic " 
            "where id= '"
                        + string { topicId } + "'",
            [&res, topicJson](const MYSQL_ROW row) -> void {
                if (row != nullptr) {}
                  topicJson{ { "uuid", row[1] },
                        { "title", row[2] }
                } else {
                    db.query(
                    "select * from view_comments " 
                    "where comment_thread_id = '"
                                + string { threadId } + "'",
                    [&res, commentsJson](const MYSQL_ROW row) -> void {
                        if (row != nullptr) {
                        commentsJson->push_back( "comments", [{ { "uuid", row[1] },
                                { "content", row[2] },
                                { "created_at", row[3] },
                                { "user", { { "uuid", row[6] }, { "username", row[7] }, {"color_hex", row[8]} } }]);

                        } else {
                            
                           threadComments{threadJson, topicJson, commentsJson};
                            res.status(200).send(threadComments->dump(4));
                            delete threadJson;
                            delete topicJson;
                            delete commentsJson;
                            delete threadComments;
                        }
                    },
                    [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                        handleDbError(res, errorString, errorNumber);
                    });
                }
            },
            [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                handleDbError(res, errorString, errorNumber);
            });
                }
            },
            [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                handleDbError(res, errorString, errorNumber);
            });
    });



   // POST topic: creates a new topic
    apiRouter.post("/topic", [] APPLICATION(req, res) {
        json* responseJson = new json;

        req.getAttribute<nlohmann::json>(
            [&res](nlohmann::json& body) -> void {
                // Body is send by the client
                if(body["title"] || body["description"] != nullptr){
                db.query(
                    "INSERT INTO topic(title, description, user_account_id)
                    VALUES( '"
                        + string { body["title"] } + "'"
                        + string { body["description"] } + "'"
                        + string { body["user_account_id"] } + "'"
                    ")");
                db.query("select * from view_topics where topic_title = '" 
                  + string { body["title"] } + "' AND user_acount_id= '"
                  + string { body["user_account_id"] } + "'",

                 ),
                 [&res, responseJson](const MYSQL_ROW row) -> void {
                if (row != nullptr) {
                  responseJson{ { "uuid", row[0] },
                        { "title", row[1] },
                        { "description", row[2] },
                        { "created_at", row[3] },
                        { "user", { { "uuid", row[4] }, { "username", row[5] } } } };
                } else {
                    res.status(200).send(responseJson->dump(4));
                    delete responseJson;
                }
            }
                  
                } else {
                    [&res]([[maybe_unused]] const std::string& key) -> void {
                res.sendStatus(400);
                    }       
                }
              
            },
            [&res]([[maybe_unused]] const std::string& key) -> void {
                res.sendStatus(500);
            }));

   // POST thread: creates new thread
    apiRouter.post("/thread", [] APPLICATION(req, res) {
        json* responseJson = new json;

        req.getAttribute<nlohmann::json>(
            [&res](nlohmann::json& body) -> void {
                // Body is send by the client
                if(body["title"] != nullptr){
                db.query(
                    "INSERT INTO thread(title, topic_id, user_account_id)
                    VALUES( '"
                        + string { body["title"] } + "'" 
                         + string { body["topicUuid"] } + "'" 
                        + string { body["user_account_id"] } + "'"
                    ")");

                  db.query("select * from view_threads where thread_title = '" 
                  + string { body["title"] } + "' AND user_acount_id= '"
                  + string { body["user_account_id"] } + "'",

                 ),
                 [&res, responseJson](const MYSQL_ROW row) -> void {
                if (row != nullptr) {
                  responseJson{ { "uuid", row[1] },
                        { "title", row[2] },
                        { "created_at", row[3] },
                        { "user", { { "uuid", row[6] }, { "username", row[7] } } } };
                } else {
                    res.status(200).send(responseJson->dump(4));
                    delete responseJson;
                }
            }
                  
                } else {
                    [&res]([[maybe_unused]] const std::string& key) -> void {
                res.sendStatus(400);
                    }       
                }
              
            },
            [&res]([[maybe_unused]] const std::string& key) -> void {
                res.sendStatus(500);
            }));

   // POST comment: creates new comment
    apiRouter.post("/comment", [] APPLICATION(req, res) {
        json* commentsJson = new json;
        json* responesJson = new json;

        req.getAttribute<nlohmann::json>(
            [&res](nlohmann::json& body) -> void {
                // Body is send by the client
                if(body["content"] || body["threadUuid"] != nullptr){
                db.query(   // insert new comment
                    "INSERT INTO comment(content, thread_id, user_account_id)
                    VALUES( '"
                        + string { body["content"] } + "'" 
                        + string { body["threadUuid"] } + "'" 
                        + string { body["user_account_id"] } + "'"
                    ")");
                    
                     db.query("select * from view_comments where comment_content = '" 
                  + string { body["content"] } + "' AND user_acount_id= '"
                  + string { body["user_account_id"] } + "'",

                 ),
                 [&res, responseJson](const MYSQL_ROW row) -> void {
                if (row != nullptr) {
                  responseJson{ { "uuid", row[1] },
                        { "title", row[2] },
                        { "created_at", row[3] },
                        { "user", { { "uuid", row[6] }, { "username", row[7] },{ "color_hex", row[8] } } } };
                } else {
                    res.status(200).send(responseJson->dump(4));
                    delete responseJson;
                }
            }
                } else {
                    [&res]([[maybe_unused]] const std::string& key) -> void {
                res.sendStatus(400);
                    }       
                }
              
            },
            [&res]([[maybe_unused]] const std::string& key) -> void {
                res.sendStatus(500);
            }));



    // POST register: registers new user
    apiRouter.post("/register", [] APPLICATION(req, res) {
        json* newUserJson = new json;

        req.getAttribute<nlohmann::json>(
            [&res](nlohmann::json& body) -> void {
                // Body is send by the client
                if(body["username"] || body["password"] || body["email"] != nullptr){
                db.query(   // insert new comment
                    "INSERT INTO user_account(username, email, password)
                    VALUES( '"
                        + string { body["username"] } + "'" 
                        + string { body["email"] } + "'" 
                        + string { body["password"] } + "'"
                    ")");
                    
                     db.query("select * from user_account where username = '" 
                  + string { body["username"] } + "' OR email= '"
                  + string { body["email"] } + "'",

                 ),
                 [&res, newUserJson](const MYSQL_ROW row) -> void {
                if (row != nullptr) {
                  res.status(401).send( json { { "error", "Username already taken or email already in use!" } }.dump(4))
                } else {
                    res.status(200).send(newUserJson->dump(4));
                    delete newUserJson;
                }
            }
                } else {
                    [&res]([[maybe_unused]] const std::string& key) -> void {
                res.sendStatus(400);
                    }       
                }
              
            },
            [&res]([[maybe_unused]] const std::string& key) -> void {
                res.sendStatus(500);
            }));



    // Example: Check user passsword
    apiRouter.post("/login", [&db] APPLICATION(req, res) {
        req.getAttribute<nlohmann::json>(
            [&res, &db](nlohmann::json& body) -> void {
                db.query(
                    "select count(*) "
                    "from user_account "
                    "where email = '"
                        + string { body["email"] } + "'",
                    [&res, &db, &body](const MYSQL_ROW row) -> void {
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
                                                res.status(200).send(json { { "success", "Successfully logged in" } }.dump(4));
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
