#!/bin/bash

DIR=$(dirname $(dirname "${0}")/$(readlink "${0}"))
NODE_PATH=$DIR/src $DIR/node.js
