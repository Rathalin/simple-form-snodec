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
    
    // get all topics
    apiRouter.get("/topic", [&db] APPLICATION(req, res) {
        json* usersJson = new json;
        db.query(
            "select uuid, title, description, created_at "
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
            [&res, topicsJson](const MYSQL_ROW row) -> void {
                if (row != nullptr) {
                   topicsJson->push_back({ { "uuid", row[0] },
                        { "title", row[1] },
                        { "description", row[2] },
                        { "created_at", row[3] },
                        { "user", { { "uuid", row[4] }, { "username", row[5] } } } });
                } else {
                    res.send(topicsJson->dump(4));
                    delete topicsJson;
                }
            },
            [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                handleDbError(res, errorString, errorNumber);
            });
    });



   // POST topic: creates a new topic
    apiRouter.post("/topic", [&db] APPLICATION(req, res) {
        req.getAttribute<nlohmann::json>(
            [&res,&db](nlohmann::json& body) -> void {

              if(body["title"] || body["description"] != nullptr){
                      db.query(
                                "INSERT INTO topic(title, description, user_account_id)"
                                    "VALUES( '"
                                       + string { body["title"] } + "'"
                                       + string { body["description"] } + "'"
                                       + string { body["user_account_id"] } + "' )",
                               [&res, &db, &body](const MYSQL_ROW row) -> void {
                                    // DO SOMETHING
                                   json* responseJson = new json; // needs to be within
                                   db.query("select * from view_topics where topic_title = '"
                                                    + string { body["title"] } + "'" "AND user_acount_id= '"
                                                    + string { body["user_account_id"] } + "'",
                                      [&res, &db, responseJson](const MYSQL_ROW row) -> void {
                                                  if (row != nullptr) {
                                                    responseJson->push_back({ { "uuid", row[0] },
                                                          { "title", row[1] },
                                                          { "description", row[2] },
                                                          { "created_at", row[3] },
                                                          { "user", { { "uuid", row[4] }, { "username", row[5] } } } });
                                                  } else {
                                                      res.status(200).send(responseJson->dump(4));
                                                      delete responseJson;
                                                  }
                                              },
                                   [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                                       handleDbError(res, errorString, errorNumber);
                                   });
                               },


                               [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                                               handleDbError(res, errorString, errorNumber);
                                           } );
                           }
                       }, // nlohmann

                       [&res]([[maybe_unused]] const std::string& key) -> void {
                                 res.sendStatus(500);
                       }); // req.attribute
                   });


    //POST THREAD: creates a new thread
     apiRouter.post("/thread", [&db] APPLICATION(req, res) {
         req.getAttribute<nlohmann::json>(
             [&res,&db](nlohmann::json& body) -> void {

               if(body["title"] != nullptr){
                       db.query(
                                 "INSERT INTO thread(title, topic_id, user_account_id)"
                                     "VALUES( '"
                                        + string { body["title"] } + "'"
                                        + string { body["topicUuid"] } + "'"
                                        + string { body["user_account_id"] } + "' )",
                                [&res, &db, &body](const MYSQL_ROW row) -> void {
                                     // DO SOMETHING
                                    json* threadJson = new json; // needs to be within
                                    db.query("select * from view_threads where thread_title = '"
                                                     + string { body["title"] } + "'" "AND user_acount_id= '"
                                                     + string { body["user_account_id"] } + "'",
                                       [&res, &db, threadJson](const MYSQL_ROW row) -> void {
                                                   if (row != nullptr) {
                                                     threadJson->push_back({ { "uuid", row[1] },
                                                           { "title", row[2] },
                                                           { "created_at", row[3] },
                                                           { "user", { { "uuid", row[6] }, { "username", row[7] } } } });
                                                   } else {
                                                       res.status(200).send(threadJson->dump(4));
                                                       delete threadJson;
                                                   }
                                               },
                                    [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                                        handleDbError(res, errorString, errorNumber);
                                    });
                                },


                                [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                                                handleDbError(res, errorString, errorNumber);
                                            } );
                            }
                        }, // nlohmann

                        [&res]([[maybe_unused]] const std::string& key) -> void {
                                  res.sendStatus(500);
                        }); // req.attribute
                    });

     //POST COMMENT: creates a new comment
      apiRouter.post("/thread", [&db] APPLICATION(req, res) {
          req.getAttribute<nlohmann::json>(
              [&res,&db](nlohmann::json& body) -> void {

                if(body["content"] || body["threadUuid"] != nullptr){
                        db.query(
                                  "INSERT INTO comment(content, thread_id, user_account_id)"
                                      "VALUES( '"
                                         + string { body["content"] } + "'"
                                         + string { body["threadUuid"] } + "'"
                                         + string { body["user_account_id"] } + "' )",
                                [&res, &db, &body](const MYSQL_ROW row) -> void {
                                      // DO SOMETHING
                                     json* commentsJson = new json;
                                     //json* responsesJson = new json;
                                     db.query("select * from view_comments where comment_content = '"
                                                      + string { body["content"] } + "'" "AND user_acount_id= '"
                                                      + string { body["user_account_id"] } + "'",
                                        [&res, &db, commentsJson](const MYSQL_ROW row) -> void {
                                                    if (row != nullptr) {
                                                      commentsJson->push_back({ { "uuid", row[1] },
                                                            { "title", row[2] },
                                                            { "created_at", row[3] },
                                                            { "user", { { "uuid", row[6] }, { "username", row[7] } } } });
                                                    } else {
                                                        res.status(200).send(commentsJson->dump(4));
                                                        delete commentsJson;
                                                    }
                                                },
                                     [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                                         handleDbError(res, errorString, errorNumber);
                                     });
                                 },


                                 [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                                                 handleDbError(res, errorString, errorNumber);
                                             } );
                             }
                         }, // nlohmann

                         [&res]([[maybe_unused]] const std::string& key) -> void {
                                   res.sendStatus(500);
                         }); // req.attribute
                     });

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

          // GET: get topic and its threads
             apiRouter.get("/topic/:uuid", [&db] APPLICATION(req, res) {

                  db.query(
                               "select * from view_topics "
                               "where uuid = '"
                                           + string { req.url } + "'",
                               [&res, &db](const MYSQL_ROW row) -> void {
                                json* topicThreads = new json; // contains topic and its threads
                                   json* topicFound = new json; // contains found topic
                                   int topicId = -1;
                                   json* threadFound = new json; // contains found thread
                                   if (row != nullptr) {
                                        topicId = {stoi(row[0])}; // topic Id
                                      topicFound->push_back({ { "uuid", row[1] },
                                           { "title", row[3] },
                                           { "description", row[4] },
                                           { "created_at", row[4] },
                                           { "user", { { "uuid", row[4] }, { "username", row[5] } } }});

                                   } else {
                                       VLOG(0) << "Topic not found";
                                       res.status(401).send(json { { "error", "Topic not found" } }.dump(4));
                                   }
                                       db.query(
                                       "select * from view_threads "
                                       "where thread_topic_id = '"
                                                   + string { char(topicId) } + "'",
                                       [&res, threadFound, topicFound, topicThreads](const MYSQL_ROW row) -> void {
                                           if (row != nullptr) {
                                           int topicId {stoi(row[0])}; // topic Id
                                           threadFound->push_back( {"threads", { { "uuid", row[1] },
                                                   { "title", row[2] },
                                                   { "created_at", row[3] },
                                                   { "user", { { "uuid", row[6] }, { "username", row[7] } } }}});
                                           }

                                           //topicThreads{topicFound,threadFound};
                                           res.status(200).send(topicFound->dump(4));
                                           res.status(200).send(threadFound->dump(4));
                                           delete threadFound;
                                           delete topicFound;
                                           delete topicThreads;


                               },
                               [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                                   handleDbError(res, errorString, errorNumber);
                               });// query
                                   },
                                     [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                                    handleDbError(res, errorString, errorNumber);
                                          });// query

                                   }); // get request

             // GET: get topic and its threads
                apiRouter.get("/thread/:uuid", [&db] APPLICATION(req, res) {

                     db.query(
                                  "select * from view_threads "
                                  "where uuid = '"
                                              + string { req.url } + "'",
                                  [&res, &db](const MYSQL_ROW row) -> void {
                                      json* threadComments = new json; // contains thread and its comments
                                      json* threadJson = new json; // contains found thread
                                      json* commentFound = new json; // contains found comment
                                      int topicId = -1;
                                      int threadId = -1;

                                      if (row != nullptr) {
                                           topicId = {stoi(row[4])}; // topic Id
                                           threadId = {stoi(row[0])}; // thread Id
                                         threadJson->push_back({ { "uuid", row[1] },
                                              { "title", row[2] },
                                              { "created_at", row[3] },
                                              { "user", { { "uuid", row[6] }, { "username", row[7] } } }});

                                      } else {
                                          VLOG(0) << "Thread not found";
                                          res.status(401).send(json { { "error", "Thread not found" } }.dump(4));
                                      }
                                          db.query(
                                          "select * from view_threads "
                                          "where thread_topic_id = '"
                                                      + string { char(topicId) } + "'",
                                          [&res, threadJson, commentFound, threadComments](const MYSQL_ROW row) -> void {
                                              if (row != nullptr) {
                                              int topicId {stoi(row[0])}; // topic Id
                                              threadJson->push_back( {"threads", { { "uuid", row[1] },
                                                      { "title", row[2] },
                                                      { "created_at", row[3] },
                                                      { "user", { { "uuid", row[6] }, { "username", row[7] } } }}});
                                              }


                                              res.status(200).send(threadJson->dump(4));
                                              res.status(200).send(commentFound->dump(4));
                                              delete threadJson;
                                              delete commentFound;
                                              delete threadComments;


                                  },
                                  [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                                      handleDbError(res, errorString, errorNumber);
                                  });// query
                                      },
                                        [&res](const std::string& errorString, unsigned int errorNumber) -> void {
                                       handleDbError(res, errorString, errorNumber);
                                             });// query

                                      }); // get request


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
