default:
	lessc style.less > style.css
	component build
# examples are not setup for this repo yet
# example:
# 	cd examples && rm -r components && component install
# 	ln -s ${PWD} ${PWD}/examples/components/honeinc-navbar 
# 	cd examples && component build 
# 	@echo example built @ file://${PWD}/examples/index.html