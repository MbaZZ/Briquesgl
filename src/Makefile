childs=client
main:
	@echo "Build depends"
	@for child in $(childs) ; do \
		echo "make "$$child; \
		cd $$child && make && cd ..; \
	done
clean:
	@echo "Build depends"
	@for child in $(childs) ; do \
		echo "make "$$child; \
		cd $$child && make clean && cd ..; \
	done
