-include .makefile
export

docker-login:
	@echo "logging in to docker to avoid rate limiting. username = $(DOCKER_HUB_USERNAME)"
	echo '$(DOCKER_HUB_PASSWORD)' | docker login --username $(DOCKER_HUB_USERNAME) --password-stdin

build: Dockerfile
	@echo "+\n++ Performing build of Docker image $(IMAGE)...\n+"
	@docker build --platform linux/amd64 -t $(IMAGE) --force-rm --rm .

push:
	@echo "+\n++ Pushing image $(IMAGE) to dockerhub...\n+"
	@docker push $(IMAGE)

docker: build docker-login push