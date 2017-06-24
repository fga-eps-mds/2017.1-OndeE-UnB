class AboutController < ApplicationController
	
	def index
		@contributors = [
			{
				avatar: "https://avatars1.githubusercontent.com/u/3246666?v=3&s=460",
				name: "Eduardo Brasil",
				role: "Software Configuration Management, developer and frontend",
				git: "https://github.com/EduardoBrasil",
			}, {
				avatar: "https://avatars1.githubusercontent.com/u/5350362?v=3&s=400",
				name: "Matheus Mello",
				role: "Software Configuration Management, developer and frontend",
				git: "https://github.com/matmello",
			},
		]
		@description = "Onde è UnB foi desenvolvido pelos alunos do curso de Engenharia de Software da Universidade de Brasilia."
	end
end