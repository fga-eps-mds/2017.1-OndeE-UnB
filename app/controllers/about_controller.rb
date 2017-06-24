class AboutController < ApplicationController
	
	def index
		@contributors = [
			{
				avatar: "https://avatars1.githubusercontent.com/u/3246666?v=3&s=460",
				name: "Eduardo Brasil",
				role: "Management, developer and frontend",
				git: "https://github.com/EduardoBrasil",
			}, {
				avatar: "https://avatars1.githubusercontent.com/u/5350362?v=3&s=400",
				name: "Matheus Mello",
				role: "Management, developer and frontend",
				git: "https://github.com/matmello",
			}, {
				avatar: "https://avatars3.githubusercontent.com/u/21176137?v=3&s=400",
				name: "Lucas Souza",
				role: "developer",
				git: "https://github.com/lucassoaresouza",
			}, {
				avatar: "https://avatars1.githubusercontent.com/u/18190061?v=3&s=400",
				name: "Taynara Carvalho",
				role: "developer",
				git: "https://github.com/tayh",
			}, {
				avatar: "https://avatars2.githubusercontent.com/u/8538996?v=3&s=400",
				name: "Rafael Rabetti",
				role: "Management, developer and frontend",
				git: "https://github.com/rafaelrabetti,"
			}	
		]
		@description = "Onde è UnB foi desenvolvido pelos alunos do curso de Engenharia de Software da Universidade de Brasilia."
	end
end