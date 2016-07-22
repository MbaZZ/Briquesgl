#childs=2Dviews 3Dviews
childs=js html css img
buildDir=../../build/
dst=$(buildDir)
testDir=$(buildDir)tests/client/
all: depend
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
test: webTest
