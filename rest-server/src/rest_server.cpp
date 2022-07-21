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
        throw invalid_argument("Unable to open file");
    }
    return json::parse(fileContent);
}

int main(int argc, char* argv[])
{
    json configJson;
    if (argc != 2) {
        cout << "Missing argument 'path to secret.json'" << endl;
        return -1;
    }
    try {
        configJson = parseConfigFile(argv[1]);
    } catch (const invalid_argument& ex) {
        cout << ex.what() << endl;
        return -1;
    }

    express::WebApp::init(argc, argv);
    express::legacy::in::WebApp app { "simple-form-rest-server" };

    database::mariadb::MariaDBConnectionDetails details {
        .hostname = "localhost",
        .username = configJson["mariadb"]["username"],
        .password = configJson["mariadb"]["password"],
        .database = configJson["mariadb"]["database"],
        .port = 3306,
        .socket = "/run/mysqld/mysqld.sock",
        .flags = 0,
    };
    database::mariadb::MariaDBClient db { details };
    app.use(express::middleware::JsonMiddleware());

    app.use("/api", createApiRouter(db));
    app.use(express::middleware::StaticMiddleware(configJson["frontend-app"]["path"]));

    app.listen(8080,
        [](const express::legacy::in::WebApp::SocketAddress socketAddress,
            int err) {
            if (err != 0) {
                std::cerr << "Failed to listen on port " << 8080;
            } else {
                std::cout << "simple-form-rest-server is listening on "
                          << socketAddress.toString() << std::endl;
            }
        });

    return express::WebApp::start();
}
