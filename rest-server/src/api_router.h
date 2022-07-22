#ifndef API_ROUTER_H
#define API_ROUTER_H

#include <database/mariadb/MariaDBClient.h>
#include <express/legacy/in/WebApp.h>

express::Router createApiRouter(database::mariadb::MariaDBClient& db);
std::string hashSha1(const std::string& str);
void handleDbError(express::Response& res, const std::string& errorString, unsigned int errorNumber);

#endif // API_ROUTER_H
