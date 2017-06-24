class AboutController < ApplicationController
	layout :false
	def index
		@contributors = [
			{
				avatar: "https://avatars0.githubusercontent.com/u/10123141?v=3&s=400",
				name: "Alexandre Kryonidis",
				role: "Management and developer ",
				git: "https://github.com/AlexandreTK"
			},{
				avatar: "https://avatars3.githubusercontent.com/u/17782636?v=3&s=400",
				name: "Daniel Moura",
				role: "Management and developer ",
				git: "https://github.com/danmoura17"
			}, {
				avatar: "https://avatars1.githubusercontent.com/u/3246666?v=3&s=460",
				name: "Eduardo Brasil",
				role: "Management and developer",
				git: "https://github.com/EduardoBrasil",
			}, {
				avatar: "https://avatars2.githubusercontent.com/u/17773211?v=3&s=400",
				name: "Eduardo Gomes",
				role: "Management and developer ",
				git: "https://github.com/eduqg"
			},  {
				avatar: "https://avatars1.githubusercontent.com/u/5350362?v=3&s=400",
				name: "Matheus Mello",
				role: "Management and developer",
				git: "https://github.com/matmello",
			}, {
				avatar: "https://avatars2.githubusercontent.com/u/8538996?v=3&s=400",
				name: "Rafael Rabetti",
				role: "Management and developer ",
				git: "https://github.com/rafaelrabetti",
			},{
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
				avatar: "https://avatars3.githubusercontent.com/u/6243672?v=3&s=400",
				name: "Kairon Velozo",
				role: "developer ",
				git: "https://github.com/kairon-v"
			}, {
				avatar: "https://avatars0.githubusercontent.com/u/17994305?v=3&s=400",
				name: "Stefane Souza",
				role: "developer",
				git: "https://github.com/stefanesouza",
			}, {
				avatar: "https://avatars3.githubusercontent.com/u/26353081?v=3&s=400",
				name: "Sannya Arvelos",
				role: "developer",
				git: "https://github.com/SannyaArvelos",
			}, {
				avatar: "https://avatars2.githubusercontent.com/u/18504114?v=3&s=400",
				name: "Mateus Roriz",
				role: "developer",
				git: "https://github.com/mateusvroriz",
			}, {
				avatar: "https://avatars3.githubusercontent.com/u/14171510?v=3&s=400",
				name: "Jordan Miranda",
				role: "developer",
				git: "https://github.com/JordanMiranda",
			}		
		]
		@description = "Onde è UnB foi desenvolvido pelos alunos do curso de Engenharia de Software da Universidade de Brasilia."
	end
end



