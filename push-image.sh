#!/bin/bash

VERSION=${1:-latest}

docker tag planning-poker:latest ghcr.io/rfoerthe/planning-poker:$VERSION && \
docker push ghcr.io/rfoerthe/planning-poker:$VERSION

