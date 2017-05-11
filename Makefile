
tests=./test/syntax/$(TARGET)
bin=./bin/cli.js

test-trees: 
	    find $(tests) -regex '.*\.jcon' -type f -exec bash -c \
	    'exec >"$$(dirname $$0)/$$(basename -s .jcon $$0).json" $$1 --ast $$0;' \
	    {} $(bin)  \;

.PHONY: test-trees



