#ifndef API_ROUTER_H
#define API_ROUTER_H

#include <database/mariadb/MariaDBClient.h>
#include <express/legacy/in/WebApp.h>

std::string hashSha1(const std::string& str);
express::Router createApiRouter(database::mariadb::MariaDBClient& db);

#endif // API_ROUTER_H
