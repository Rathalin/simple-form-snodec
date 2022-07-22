#include "api_router.h"
#include <database/mariadb/MariaDBClient.h>
#include <express/legacy/in/WebApp.h>
#include <express/middleware/JsonMiddleware.h>
#include <express/middleware/StaticMiddleware.h>
#include <express/middleware/VHost.h>
#include <fstream>
#include <iostream>
#include <nlohmann/json.hpp>

using namespace std;
using namespace nlohmann;

nlohmann::json parseConfigFile(const string& filePath)
{
    string fileContent;
    string line;
    ifstream myfile { filePath };
    if (myfile.is_open()) {
        while (getline(myfile, line)) {
            fileContent += line;
        }
        myfile.close();
    } else {
        throw invalid_argument("Unable to open file '" + filePath + "'");
    }
    return json::parse(fileContent);
}

int main(int argc, char* argv[])
{
    json config;
    if (argc != 2) {
        VLOG(0) << "Missing argument 'path to config.json'";
        return -1;
    }
    try {
        config = parseConfigFile(argv[1]);
    } catch (const invalid_argument& ex) {
        VLOG(0) << ex.what();
        return -1;
    } catch (nlohmann::detail::parse_error& ex) {
        VLOG(0) << ex.what();
        return -1;
    }

    express::WebApp::init(argc, argv);
    express::legacy::in::WebApp app { "simple-form-rest-server" };

    database::mariadb::MariaDBConnectionDetails details {
        .hostname = "localhost",
        .username = config["mariadb"]["username"],
        .password = config["mariadb"]["password"],
        .database = config["mariadb"]["database"],
        .port = 3306,
        .socket = "/run/mysqld/mysqld.sock",
        .flags = 0,
    };
    database::mariadb::MariaDBClient db { details };
    app.use(express::middleware::JsonMiddleware());

    app.use("/api", createApiRouter(db));
    app.use(express::middleware::StaticMiddleware(config["frontend-app"]["path"]));

    app.listen(8080,
        [](const express::legacy::in::WebApp::SocketAddress socketAddress,
            int err) {
            if (err != 0) {
                VLOG(0) << "Failed to listen on port " << 8080;
            } else {
                VLOG(0) << "simple-form-rest-server is listening on "
                        << socketAddress.toString();
            }
        });

    return express::WebApp::start();
}
