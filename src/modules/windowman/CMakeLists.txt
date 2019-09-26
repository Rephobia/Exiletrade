cmake_minimum_required(VERSION 3.15)
project(windowman)

file(GLOB src_files "*.cpp" "*.h" "*.c")

add_library(${PROJECT_NAME} SHARED ${src_files} ${CMAKE_JS_SRC})

set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

target_include_directories(${PROJECT_NAME} SYSTEM PRIVATE
                           ${CMAKE_SOURCE_DIR}/node_modules/node-addon-api
			   ${CMAKE_SOURCE_DIR}/node_modules/node-addon-api/src
                           ${CMAKE_JS_INC})

target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})
