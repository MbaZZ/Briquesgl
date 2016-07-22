appName=briquegl
all: generate
install: depend
depend:
	npm install 
install-dev: install
	sudo npm install -g webpack mocha
	@echo "You need docker"
build:
	cd ./src && make && cd ..
pack: build
	docker build -t $(appName)-app ./build/
deploy:

deploy-dev:
	
clean-all: clean
	rm -rf ./node-modules
clean:
	cd ./src && make clean && cd ..
	npm remove
test:
	npm test	
dev:	
	
