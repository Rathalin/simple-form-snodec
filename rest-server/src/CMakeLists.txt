cmake_minimum_required(VERSION 3.5)

project(simple-form-snodec LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(snodec COMPONENTS express db-mariadb net-in core-legacy)

add_executable(rest-server rest_server.cpp)
target_link_libraries(rest-server PRIVATE snodec::express snodec::db-mariadb snodec::net-in snodec::core-legacy)
