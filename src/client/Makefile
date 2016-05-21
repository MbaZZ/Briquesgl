#childs=2Dviews 3Dviews
childs=controller 
buildDir=../../build/
dst=$(buildDir)
testDir=$(buildDir)tests/client/
array=(one two three four [5]=five)
all: depend
	@echo "----------------------------"
	@echo "build client"
	@echo "----------------------------"
depend:	
	@echo "Build depends"
	@for child in $(childs) ; do \
		echo "make "$$child; \
		cd $$child && make && cd ..; \
	done
clean:	
	@echo "Clean depends"
	@for child in $(childs) ; do \
		echo "make clean "$$child; \
		cd $$child && make clean && cd ..; \
	done
webTest:
	@echo "test Client"
	cp -f indexTest.html $(dst)index.html
	chromium-browser $(dst)index.html
	#chromium-browser ${PWD}$(testDir)&
test: webTest
